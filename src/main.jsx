// Entry point — mount the App into #root
(function() {
  const mount = () => {
    const rootEl = document.getElementById('root');
    if (!rootEl || !window.App) {
      // Wait for all babel scripts to finish processing
      return setTimeout(mount, 50);
    }
    const root = ReactDOM.createRoot(rootEl);
    root.render(React.createElement(window.App));
  };
  mount();
})();
