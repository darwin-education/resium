export default {
  typescript: true,
  title: "Resium",
  menu: [
    "Home",
    {
      name: "Installation",
      menu: ["Installation", "Set up webpack config 1", "Set up webpack config 2"],
    },
    "Getting Started",
    "Guide",
    {
      name: "Components",
    },
    {
      name: "Examples",
      href: "/examples/",
    },
    "Advanced",
    "Migration Guide",
    "Contribution",
  ],
  htmlContext: {
    head: {
      raw: ["<style>img{max-width:100%;}</style>"],
    },
  },
  themeConfig: {
    initialColorMode: "dark",
    repository: "https://github.com/darwin-education/resium",
    colors: {
      primary: "#00A0E8",
      link: "#00A0E8",
    },
    styles: {
      body: {
        fontFamily: "'Source Sans Pro', Helvetica, sans-serif",
      },
      h1: {
        fontFamily: "'Source Sans Pro', Helvetica, sans-serif",
        fontSize: "50px",
      },
      h2: {
        fontSize: "28px",
        color: "#00A0E8",
      },
      h3: {
        color: "#50c0f1",
      },
      p: {
        margin: "10px 0",
      },
      code: {
        background: "#1bad8b",
        padding: "0 5px",
        overflow: "auto",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
      },
    },
  },
};
