module.exports = {
  presets: [
    [ '@babel/preset-env', {
      targets: '> 0.25%, not dead', // Target modern browsers but exclude old ones
      modules: false // Keep ES modules (useful if bundling)
    } ]
  ],
  plugins: [
    '@babel/plugin-transform-runtime' // Helps with async/await and regenerator runtime
  ]
}
