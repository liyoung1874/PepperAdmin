import defaultSettings from '@/settings'

const title = defaultSettings.title || '辣椒商城管理后台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
