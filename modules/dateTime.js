// dateTime.js
export const updateDateTime = () => {
    const current_date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const dateTimeString = current_date.toLocaleString(undefined, options);
  
    const currentDateElement = document.getElementById('current_date');
    currentDateElement.textContent = dateTimeString;
  }