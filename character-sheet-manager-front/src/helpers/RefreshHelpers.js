const refreshSheet = async (id, setSheet) => {
    if (id) {
      fetch("http://localhost:8080/api/v1/sheet/" + id)
      .then(response => {
                 if (response.ok) {
                  return response.json();
                 }  else {
                  return Promise.reject(
                      new Error(`Unexpected status code ${response.status}`)
                  );
                 }
              })
      .then(setSheet).catch(
                  error => {
                      console.error(error);
                  });
              }
    }

    const refreshHome = async () => {
      return;
    }

export {refreshSheet, refreshHome};