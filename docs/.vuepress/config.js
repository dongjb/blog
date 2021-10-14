const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];

module.exports = {
  title: '上善若水的博客',
  description: '在每一个因缘与相会中流过 不必积存 在每一次飘风与骤雨里流过 不必驻留',
  dest: 'public',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['script', { src: '/bd.js' }]
  ],
  theme: 'reco',
  themeConfig: {
    nav: [
      { text: '主页', link: '/', icon: 'reco-home' },
      { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
      { text: 'GitHub', link: 'https://github.com/dongjb', icon: 'reco-github' }
    ],
    // sidebar: {
    //   '/docs/theme-reco/': ['', 'theme', 'plugin', 'api']
    // },
    type: 'blog',
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: '分类' // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: '标签' // 默认 “标签”
      }
    },
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    // sidebar: 'auto',
    // 最后更新时间
    lastUpdated: '最近更新',
    // 作者
    author: '上善若水',
    // 作者头像
    authorAvatar: '/avatar.jpg',
    // 备案号
    record: '京ICP备17038381号-2',
    // 备案链接
    recordLink: 'https://beian.miit.gov.cn',
    // 项目开始时间
    startYear: '2020'
    /**
     * 密钥 (if your blog is private)
     */

    // keyPage: {
    //   keys: ['your password'],
    //   color: '#42b983',
    //   lineColor: '#42b983'
    // },

    /**
     * valine 设置 (if you need valine comment )
     */

    // valineConfig: {
    //   appId: '...',// your appId
    //   appKey: '...', // your appKey
    // }
  },
  markdown: {
    lineNumbers: true
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compression-webpack-plugin').use(
        new CompressionWebpackPlugin({
          // filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240, //对超过10k的数据进行压缩
          minRatio: 0.6 // 压缩比例，值为0 ~ 1
        })
      );
    }
  }
};
