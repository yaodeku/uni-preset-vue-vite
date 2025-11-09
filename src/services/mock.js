import { getToken, setToken, clearToken, getUserId, setUserId } from '../utils/storage.js'

function nowISO() { return new Date().toISOString() }
function uuid() { return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random()*16|0, v = c==='x'?r:(r&0x3|0x8); return v.toString(16) }) }

function readStore(key, def) {
  try { const v = uni.getStorageSync(key); return v ? JSON.parse(v) : (def ?? null) } catch { return def ?? null }
}
function writeStore(key, val) {
  try { uni.setStorageSync(key, JSON.stringify(val)) } catch {}
}

const db = {
  workspaces: () => readStore('db_workspaces', []),
  setWorkspaces: (v) => writeStore('db_workspaces', v),
  projects: () => readStore('db_projects', []),
  setProjects: (v) => writeStore('db_projects', v),
  tasks: () => readStore('db_tasks', []),
  setTasks: (v) => writeStore('db_tasks', v),
  tags: () => readStore('db_tags', []),
  setTags: (v) => writeStore('db_tags', v),
  comments: () => readStore('db_comments', []),
  setComments: (v) => writeStore('db_comments', v),
  attachments: () => readStore('db_attachments', []),
  setAttachments: (v) => writeStore('db_attachments', v),
  notifications: () => readStore('db_notifications', []),
  setNotifications: (v) => writeStore('db_notifications', v),
}

function ensureAuth(required=true) {
  const token = getToken()
  if (required && !token) return { status: 'error', error_code: 'UNAUTHORIZED', message: '未授权访问', details: {} }
  return null
}

export async function mockRequest({ method, url, data, header }) {
  const u = new URL(url, 'http://mock.local')
  const path = u.pathname

  // USER
  if (method === 'POST' && path === '/user/register') {
    const id = uuid();
    setUserId(id)
    return { statusCode: 200, data: { status: 'success', user_id: id, message: '注册成功' } }
  }
  if (method === 'POST' && path === '/user/login') {
    const id = getUserId() || uuid();
    setUserId(id)
    const token = uuid();
    setToken(token)
    return { statusCode: 200, data: { status: 'success', user_id: id, token, message: '登录成功' } }
  }
  if (method === 'POST' && path === '/user/logout') {
    const err = ensureAuth(true); if (err) return { statusCode: 401, data: err }
    clearToken()
    return { statusCode: 200, data: { status: 'success', message: '登出成功' } }
  }
  if (method === 'GET' && path.startsWith('/user/profile/')) {
    const id = path.split('/').pop()
    return { statusCode: 200, data: { status: 'success', data: { id, email: 'user@example.com', full_name: 'Demo User', display_name: 'Demo', avatar_url: '', bio: '', job_title: '', organization: '', created_at: nowISO() } } }
  }
  if ((method === 'PUT' || method === 'DELETE') && path.startsWith('/user/profile/')) {
    const err = ensureAuth(true); if (err) return { statusCode: 401, data: err }
    if (method === 'PUT') {
      const id = path.split('/').pop()
      return { statusCode: 200, data: { status: 'success', data: { id, email: 'user@example.com', full_name: data.full_name || 'Demo User', display_name: data.display_name || 'Demo', bio: data.bio || '', updated_at: nowISO() }, message: '用户信息更新成功' } }
    }
    return { statusCode: 200, data: { status: 'success', message: '用户删除成功' } }
  }

  // WORKSPACES
  if (path === '/workspaces' && method === 'GET') {
    const list = db.workspaces()
    return { statusCode: 200, data: { status: 'success', data: list, count: list.length } }
  }
  if (path === '/workspaces' && method === 'POST') {
    const err = ensureAuth(true); if (err) return { statusCode: 401, data: err }
    const ws = { id: uuid(), name: data.name || 'New Workspace', description: data.description || '', owner_user_id: getUserId() || uuid(), created_at: nowISO() }
    const list = db.workspaces(); list.push(ws); db.setWorkspaces(list)
    return { statusCode: 200, data: { status: 'success', data: ws, message: '工作空间创建成功' } }
  }
  if (path.startsWith('/workspaces/') ) {
    const id = path.split('/').pop()
    if (method === 'GET') {
      const ws = db.workspaces().find(x=>x.id===id)
      if (!ws) return { statusCode: 404, data: { status:'error', error_code:'NOT_FOUND', message:'资源未找到', details:{} } }
      return { statusCode: 200, data: { status:'success', data: { ...ws, updated_at: ws.updated_at || ws.created_at } } }
    }
    const err = ensureAuth(true); if (err) return { statusCode: 401, data: err }
    if (method === 'PUT') {
      const list = db.workspaces(); const idx = list.findIndex(x=>x.id===id)
      if (idx<0) return { statusCode:404, data:{ status:'error', error_code:'NOT_FOUND', message:'资源未找到', details:{} } }
      list[idx] = { ...list[idx], name: data.name ?? list[idx].name, description: data.description ?? list[idx].description, updated_at: nowISO() }
      db.setWorkspaces(list)
      return { statusCode:200, data:{ status:'success', data: list[idx], message:'工作空间更新成功' } }
    }
    if (method === 'DELETE') {
      const list = db.workspaces().filter(x=>x.id!==id); db.setWorkspaces(list)
      return { statusCode:200, data:{ status:'success', message:'工作空间删除成功' } }
    }
  }

  // PROJECTS
  if (path === '/projects' && method === 'GET') {
    const list = db.projects()
    const workspace_id = u.searchParams.get('workspace_id')
    const owner_id = u.searchParams.get('owner_id')
    const filtered = list.filter(p => (!workspace_id || p.workspace_id===workspace_id) && (!owner_id || p.owner_id===owner_id))
    return { statusCode: 200, data: { status: 'success', data: filtered, count: filtered.length } }
  }
  if (path === '/projects' && method === 'POST') {
    const err = ensureAuth(true); if (err) return { statusCode: 401, data: err }
    const proj = { id: uuid(), workspace_id: data.workspace_id, title: data.title || 'New Project', description: data.description || '', owner_id: getUserId() || uuid(), created_at: nowISO() }
    const list = db.projects(); list.push(proj); db.setProjects(list)
    return { statusCode: 200, data: { status: 'success', data: proj, message: '项目创建成功' } }
  }
  if (path.startsWith('/projects/')) {
    const id = path.split('/').pop()
    if (method === 'GET') {
      const p = db.projects().find(x=>x.id===id)
      if (!p) return { statusCode:404, data:{ status:'error', error_code:'NOT_FOUND', message:'资源未找到', details:{} } }
      return { statusCode:200, data:{ status:'success', data:{ ...p, updated_at: p.updated_at || p.created_at } } }
    }
    const err = ensureAuth(true); if (err) return { statusCode: 401, data: err }
    if (method === 'PUT') {
      const list = db.projects(); const idx = list.findIndex(x=>x.id===id)
      if (idx<0) return { statusCode:404, data:{ status:'error', error_code:'NOT_FOUND', message:'资源未找到', details:{} } }
      list[idx] = { ...list[idx], title: data.title ?? list[idx].title, description: data.description ?? list[idx].description, updated_at: nowISO() }
      db.setProjects(list)
      return { statusCode:200, data:{ status:'success', data:list[idx], message:'项目更新成功' } }
    }
    if (method === 'DELETE') {
      const list = db.projects().filter(x=>x.id!==id); db.setProjects(list)
      return { statusCode:200, data:{ status:'success', message:'项目删除成功' } }
    }
  }

  // TASKS
  if (path === '/tasks' && method === 'GET') {
    const list = db.tasks()
    const project_id = u.searchParams.get('project_id')
    const assignee_id = u.searchParams.get('assignee_id')
    const status = u.searchParams.get('status')
    const workspace_id = u.searchParams.get('workspace_id')
    const filtered = list.filter(t => (!project_id || t.project_id===project_id) && (!assignee_id || t.assignee_id===assignee_id) && (!status || t.status===status) && (!workspace_id || t.workspace_id===workspace_id))
    return { statusCode:200, data:{ status:'success', data: filtered, count: filtered.length } }
  }
  if (path === '/tasks' && method === 'POST') {
    const err = ensureAuth(true); if (err) return { statusCode:401, data: err }
    const t = { id: uuid(), project_id: data.project_id, title: data.title || 'New Task', description: data.description || '', status: 'backlog', priority: data.priority || 'medium', due_at: data.due_at || null, creator_id: getUserId() || uuid(), created_at: nowISO() }
    const list = db.tasks(); list.push(t); db.setTasks(list)
    return { statusCode:200, data:{ status:'success', data:t, message:'任务创建成功' } }
  }
  if (path.startsWith('/tasks/')) {
    const id = path.split('/').pop()
    if (method === 'GET') {
      const t = db.tasks().find(x=>x.id===id)
      if (!t) return { statusCode:404, data:{ status:'error', error_code:'NOT_FOUND', message:'资源未找到', details:{} } }
      return { statusCode:200, data:{ status:'success', data:{ ...t, updated_at: t.updated_at || t.created_at } } }
    }
    const err = ensureAuth(true); if (err) return { statusCode:401, data: err }
    if (method === 'PUT') {
      const list = db.tasks(); const idx = list.findIndex(x=>x.id===id)
      if (idx<0) return { statusCode:404, data:{ status:'error', error_code:'NOT_FOUND', message:'资源未找到', details:{} } }
      list[idx] = { ...list[idx], ...data, updated_at: nowISO() }
      db.setTasks(list)
      return { statusCode:200, data:{ status:'success', data:list[idx], message:'任务更新成功' } }
    }
    if (method === 'DELETE') {
      const list = db.tasks().filter(x=>x.id!==id); db.setTasks(list)
      return { statusCode:200, data:{ status:'success', message:'任务删除成功' } }
    }
  }

  // TAGS
  if (path === '/tags' && method === 'GET') {
    const workspace_id = u.searchParams.get('workspace_id')
    const list = db.tags().filter(t => !workspace_id || t.workspace_id===workspace_id)
    return { statusCode:200, data:{ status:'success', data:list, count: list.length } }
  }
  if (path === '/tags' && method === 'POST') {
    const err = ensureAuth(true); if (err) return { statusCode:401, data: err }
    const tag = { id: uuid(), workspace_id: data.workspace_id, name: data.name, color: data.color, created_by: getUserId() || uuid(), created_at: nowISO() }
    const list = db.tags(); list.push(tag); db.setTags(list)
    return { statusCode:200, data:{ status:'success', data: tag, message: '标签创建成功' } }
  }
  if (path.startsWith('/tags/')) {
    const id = path.split('/').pop()
    const err = ensureAuth(true); if (err) return { statusCode:401, data: err }
    if (method === 'PUT') {
      const list = db.tags(); const idx = list.findIndex(x=>x.id===id)
      if (idx<0) return { statusCode:404, data:{ status:'error', error_code:'NOT_FOUND', message:'资源未找到', details:{} } }
      list[idx] = { ...list[idx], name: data.name ?? list[idx].name, color: data.color ?? list[idx].color, updated_at: nowISO() }
      db.setTags(list)
      return { statusCode:200, data:{ status:'success', data:list[idx], message:'标签更新成功' } }
    }
    if (method === 'DELETE') {
      const list = db.tags().filter(x=>x.id!==id); db.setTags(list)
      return { statusCode:200, data:{ status:'success', message:'标签删除成功' } }
    }
  }

  // COMMENTS
  if (path === '/comments' && method === 'GET') {
    const resource_type = u.searchParams.get('resource_type')
    const resource_id = u.searchParams.get('resource_id')
    const list = db.comments().filter(c => (!resource_type || c.resource_type===resource_type) && (!resource_id || c.resource_id===resource_id))
    return { statusCode:200, data:{ status:'success', data:list, count:list.length } }
  }
  if (path === '/comments' && method === 'POST') {
    const err = ensureAuth(true); if (err) return { statusCode:401, data: err }
    const c = { id: uuid(), resource_type: data.resource_type, resource_id: data.resource_id, user_id: getUserId() || uuid(), content: data.content, created_at: nowISO() }
    const list = db.comments(); list.push(c); db.setComments(list)
    return { statusCode:200, data:{ status:'success', data:c, message:'评论创建成功' } }
  }
  if (path.startsWith('/comments/')) {
    const id = path.split('/').pop()
    const err = ensureAuth(true); if (err) return { statusCode:401, data: err }
    if (method === 'PUT') {
      const list = db.comments(); const idx = list.findIndex(x=>x.id===id)
      if (idx<0) return { statusCode:404, data:{ status:'error', error_code:'NOT_FOUND', message:'资源未找到', details:{} } }
      list[idx] = { ...list[idx], content: data.content ?? list[idx].content, updated_at: nowISO() }
      db.setComments(list)
      return { statusCode:200, data:{ status:'success', data:list[idx], message:'评论更新成功' } }
    }
    if (method === 'DELETE') {
      const list = db.comments().filter(x=>x.id!==id); db.setComments(list)
      return { statusCode:200, data:{ status:'success', message:'评论删除成功' } }
    }
  }

  // ATTACHMENTS
  if (path === '/attachments' && method === 'GET') {
    const t = u.searchParams.get('attached_to_type')
    const id = u.searchParams.get('attached_to_id')
    const owner = u.searchParams.get('owner_user_id')
    const list = db.attachments().filter(a => (!t || a.attached_to_type===t) && (!id || a.attached_to_id===id) && (!owner || a.owner_user_id===owner))
    return { statusCode:200, data:{ status:'success', data:list, count:list.length } }
  }
  if (path === '/attachments' && method === 'POST') {
    const err = ensureAuth(true); if (err) return { statusCode:401, data: err }
    const a = { id: uuid(), attached_to_type: data.attached_to_type, attached_to_id: data.attached_to_id, file_name: data.file_name, file_size: data.file_size, content_type: data.content_type, storage_key: data.storage_key, owner_user_id: getUserId() || uuid(), created_at: nowISO() }
    const list = db.attachments(); list.push(a); db.setAttachments(list)
    return { statusCode:200, data:{ status:'success', data:a, message:'附件上传成功' } }
  }
  if (path.startsWith('/attachments/')) {
    const id = path.split('/').pop()
    const err = ensureAuth(true); if (err) return { statusCode:401, data: err }
    if (method === 'DELETE') {
      const list = db.attachments().filter(x=>x.id!==id); db.setAttachments(list)
      return { statusCode:200, data:{ status:'success', message:'附件删除成功' } }
    }
  }

  // NOTIFICATIONS
  if (path === '/notifications' && method === 'GET') {
    const is_read = u.searchParams.get('is_read')
    const list = db.notifications()
    const filtered = list.filter(n => (is_read==null || String(n.is_read)===String(is_read)))
    return { statusCode:200, data:{ status:'success', data: filtered, count: filtered.length } }
  }
  if (path.startsWith('/notifications/') && path.endsWith('/read') && method === 'PUT') {
    const err = ensureAuth(true); if (err) return { statusCode:401, data: err }
    const id = path.split('/')[2]
    const list = db.notifications(); const idx = list.findIndex(x=>x.id===id)
    if (idx<0) return { statusCode:404, data:{ status:'error', error_code:'NOT_FOUND', message:'资源未找到', details:{} } }
    list[idx] = { ...list[idx], is_read: true, delivered_at: nowISO() }
    db.setNotifications(list)
    return { statusCode:200, data:{ status:'success', data:{ id, is_read: true, delivered_at: nowISO() }, message:'通知标记为已读' } }
  }
  if (path.startsWith('/notifications/') && method === 'DELETE') {
    const err = ensureAuth(true); if (err) return { statusCode:401, data: err }
    const id = path.split('/').pop()
    const list = db.notifications().filter(x=>x.id!==id); db.setNotifications(list)
    return { statusCode:200, data:{ status:'success', message:'通知删除成功' } }
  }

  // SEARCH
  if (path === '/search/tasks' && method === 'GET') {
    const q = (u.searchParams.get('query')||'').toLowerCase()
    const list = db.tasks().filter(t => t.title.toLowerCase().includes(q) || (t.description||'').toLowerCase().includes(q))
    return { statusCode:200, data:{ status:'success', data: list.map(t=>({ id:t.id, title:t.title, description:t.description, project_id:t.project_id, status:t.status })), count: list.length, query: q } }
  }
  if (path === '/search/projects' && method === 'GET') {
    const q = (u.searchParams.get('query')||'').toLowerCase()
    const list = db.projects().filter(p => p.title.toLowerCase().includes(q) || (p.description||'').toLowerCase().includes(q))
    return { statusCode:200, data:{ status:'success', data: list.map(p=>({ id:p.id, title:p.title, description:p.description, workspace_id:p.workspace_id })), count: list.length, query: q } }
  }

  return { statusCode: 404, data: { status:'error', error_code:'NOT_FOUND', message:`未匹配的Mock: ${method} ${path}`, details:{} } }
}
