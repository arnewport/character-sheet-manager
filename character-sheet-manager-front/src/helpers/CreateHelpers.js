const createNewSheet = async (userId, navigate) => {

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
                return response.json().then(data => createNewUserSheet(data, userId, navigate));
            } else {
                return response.json();
            }
        })
        .then(errors => {
            if (errors) {
                return Promise.reject(errors);
            }
        })
        .catch((errors) => {
            if (errors) {
              if (errors.length) {
                throw new Error(errors.join('\n'));
              } else {
                throw new Error(errors);
              }
            }
          });
    }

  const createNewUserSheet = async (data, userId, navigate) => {

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
      .then(errors => {
          if (errors) {
              return Promise.reject(errors);
          }
      })
      .catch((errors) => {
        if (errors) {
          if (errors.length) {
            throw new Error(errors.join('\n'));
          } else {
            throw new Error(errors);
          }
        }
      });
  }

  export { createNewSheet, createNewUserSheet };