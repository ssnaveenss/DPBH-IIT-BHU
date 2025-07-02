//feature 1
var count=0;

function collectTextNodes(element, texts) {
  for (const childNode of element.childNodes) {
    if (
      childNode.nodeType === Node.TEXT_NODE &&
      childNode.nodeValue.trim() !== ""
      ) {
        texts.push({ text: childNode.nodeValue.trim(), element: childNode.parentElement });
      } else if (
      childNode.nodeType === Node.ELEMENT_NODE &&
      childNode.tagName.toUpperCase() !== "SCRIPT" &&
      childNode.tagName.toUpperCase() !== "STYLE"
      ) {
        collectTextNodes(childNode, texts);
      }
    }
  }
  const allTexts = [];
  collectTextNodes(document.body, allTexts);
  highlightLimitedTimeDeal(allTexts);
  
  
  function highlightLimitedTimeDeal(textarr) {
    fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ allTexts: textarr }),
    })
    .then(response => response.json())
    .then(data => {
      
      const prediction = data.predictionResults;
      
      const deceptive_texts=[]
      
      prediction.forEach((prediction) => {
        if(prediction['prediction']=="yes" || prediction['prediction']=="Yes" ){
          deceptive_texts.push(prediction['text']);
      }
    });
    allTexts.forEach(({ element }) => {
      if (deceptive_texts.includes(element.innerText)) {
        element.style.border = '4px solid red';
        count++;
      }
      
    });
    if(count>0){
      alert(count +" Dark patterns found");
    }
  })
  .catch(error => console.error('Error:', error));
}

























//feature 2
function alertButtonText(popUp) {
    const buttons = popUp.querySelectorAll('button');
    let buttonTexts = [];
    buttons.forEach((button) => {
        const buttonText = button.textContent.trim().toLowerCase();;
        buttonTexts.push(buttonText);
    });
    if(buttonTexts.includes('sign in') ||buttonTexts.includes('sign up') || buttonTexts.includes('sign-in') ||buttonTexts.includes('sign-up')){
        popUp.parentNode.removeChild(popUp);
        const elementToRemove = document.querySelector('.spinner-loading-overlay');
        if (elementToRemove) {
            elementToRemove.remove();
          }
    }
  }

  function isLikelyPopup(node) {
    if (node && node.classList) {
      const popupClasses = [
        'popup',
        'modal',
        'login-modal-div',
        'overlay',
        'dialog',
        'popup-container',
        'modal-container',
        'overlay-container',
        'dialog-container',
        'popup-content',
        'modal-content',
        'overlay-content',
        'dialog-content',
        'popup-box',
        'modal-box',
        'overlay-box',
        'dialog-box',
        'popup-wrapper',
        'modal-wrapper',
        'overlay-wrapper',
        'dialog-wrapper',
        'popup-inner',
        'modal-inner',
        'overlay-inner',
        'dialog-inner',
        'popup-bg',
        'modal-bg',
        'overlay-bg',
        'dialog-bg',
        'popup-overlay',
        'modal-overlay',
        'overlay-overlay',
        'dialog-overlay',
        'popup-mask',
        'modal-mask',
        'overlay-mask',
        'dialog-mask',
        'popup-frame',
        'modal-frame',
        'overlay-frame',
        'dialog-frame',
        'popup-wrap',
        'modal-wrap',
        'overlay-wrap',
        'dialog-wrap',
        'popup-window',
        'modal-window',
        'overlay-window',
        'dialog-window',
        'popup-panel',
        'modal-panel',
        'overlay-panel',
        'dialog-panel',
        'popup-body',
        'modal-body',
        'overlay-body',
        'dialog-body',
        'popup-header',
        'modal-header',
        'overlay-header',
        'dialog-header',
        'popup-title',
        'modal-title',
        'overlay-title',
        'dialog-title',
        'popup-close',
        'modal-close',
        'overlay-close',
        'dialog-close',
        'popup-button',
        'modal-button',
        'overlay-button',
        'dialog-button',
        'popup-footer',
        'modal-footer',
        'overlay-footer',
        'dialog-footer',
      ];
      return popupClasses.some((popupClass) => node.classList.contains(popupClass));
    }
    return false;
  }
  
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        const isPopup = Array.from(mutation.addedNodes).some(isLikelyPopup);
        if (isPopup) {
          console.log("A pop-up has appeared!");
          const popUp = Array.from(mutation.addedNodes).find(isLikelyPopup);
          alertButtonText(popUp);
        }
      }
    });
  });

  observer.observe(document, { childList: true, subtree: true });