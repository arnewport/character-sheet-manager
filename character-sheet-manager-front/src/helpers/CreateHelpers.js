const createNewSheet = async (userId, navigate, setErrors) => {

    const INITIAL_SHEET = {
      playerName: '',
      characterName: '',
      curHitPoints: 0,
      maxHitPoints: 0,
      armorClass: 0,
      savingThrow: 0,
      thac0: 0,
      attackBonus: 0
    }

    const config = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(INITIAL_SHEET)
  }

    fetch("http://localhost:8080/api/v1/sheet", config)
        .then(response => {
            if (response.ok) {
                return response.json().then(data => createNewUserSheet(data, userId, navigate, setErrors));
            } else {
                return response.json();
            }
        })
        .then(errs => {
            if (errs) {
                return Promise.reject(errs);
            }
        })
        .catch(errs => {
            if (errs.length) {
                setErrors(errs);
            } else {
                setErrors([errs]);
            }
        });
    }

  const createNewUserSheet = async (data, userId, navigate, setErrors) => {

    // POST
    const config = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "userId": userId,
        "sheetId": data.id,
        "role": "OWNER",
        "status": "NONE"
      })
  }

  fetch("http://localhost:8080/api/v1/userSheet", config)
      .then(response => {
          if (response.ok) {
              navigate(`/sheet/${data.id}`);
          } else {
              return response.json();
          }
      })
      .then(errs => {
          if (errs) {
              return Promise.reject(errs);
          }
      })
      .catch(errs => {
          if (errs.length) {
              setErrors(errs);
          } else {
              setErrors([errs]);
          }
      });
  }

  export { createNewSheet, createNewUserSheet };