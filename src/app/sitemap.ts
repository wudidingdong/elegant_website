import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wudidingdong.netlify.app/'

  // 网站静态路由
  const routes = [
    '',              // 对应 href = "/" (关于我)
    '/publications', // 对应 href = "/publications" (论文)
    '/teaching',     // 对应 href = "/teaching" (教学)
    '/awards',       // 对应 href = "/awards" (项目与荣誉)
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const, // 建议搜索引擎每月抓取一次
    priority: route === '' ? 1 : 0.8,    // 首页权重设为最高 1.0，子页面设为 0.8
  }))
}
