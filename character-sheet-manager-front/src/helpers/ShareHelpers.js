const handleFindRecipient = async (e, recepientName, username, setRecipientId) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/v1/user/" + recepientName);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("User not found.");
      } else {
        throw new Error(`Failed to fetch username: ${response.status}`);
      }
    }

    const data = await response.json();
    if (data.username === username) {
        console.log("You cannot share a character sheet with yourself.");
        console.log("Please enter a username and search for a user.");
        return;
    }
    setRecipientId(data.id);
  }

  const handleShare = async (e, recipientId, id, setErrors) => {
    e.preventDefault();

    if (recipientId < 1) {
      console.log("The recipient has either not been selected or was not found.");
      console.log("Please enter a username and search for a user.");
      return;
    }

    const config = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "userId": recipientId,
        "sheetId": id,
        "role": "EDITOR",
        "status": "NONE"
      })
  }

  fetch("http://localhost:8080/api/v1/userSheet", config)
      .then(response => {
          if (response.ok) {
            console.log("Successful share!")
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

  export { handleFindRecipient, handleShare };