import navBut from './components/Navbar'
import React, { useEffect, useState } from "react";

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = evt => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
  return (
    <button
      className="link-button"
      id="setup_button"
      aria-label="Install app"
      title="Install app"
      onClick={onClick}
    >
      Install
    </button>
  );
};

export default InstallPWA;



// const butInstall = document.getElementById('buttonInstall');


// // Logic for installing the PWA
// // TODO: Add an event handler to the `beforeinstallprompt` event
// window.addEventListener('beforeinstallprompt', (event) => {
  
//   // Store the triggered events
//   window.deferredPrompt = event;

//   // Remove the hidden class from the button.
//   butInstall.classList.toggle("hidden", false);
// });


// // TODO: Implement a click event handler on the `butInstall` element
// butInstall.addEventListener('click', async () => {
//   const promptEvent = window.deferredPrompt;
//   if (!promptEvent) {
//     return;
//   }
//   // Show prompt
//   promptEvent.prompt();
//   // Reset the deferred prompt variable, it can only be used once.
//   window.deferredPrompt = null;

//   butInstall.classList.toggle("hidden", true);
  
// });



// // TODO: Add an handler for the `appinstalled` event
// window.addEventListener('appinstalled', (event) => {
//   window.deferredPrompt = null;
// });;