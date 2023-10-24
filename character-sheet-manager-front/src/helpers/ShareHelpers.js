const handleFindRecipient = async (e, recepientName, setErrors, id, setShowShareModal) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/v1/user/" + recepientName);

    if (!response.ok) {
      if (response.status === 404) {
        setErrors(["User not found"]);
        return;
      } else {
        setErrors([`Failed to fetch username: ${response.status}`]);
        return;
      }
    }

    const data = await response.json();
    const userIds = await findUserIdsBySheetId(id, setErrors);
    const recipientId = await data.id;

    if (userIds.includes(data.id)) {
        setErrors(["This user already has access to this character sheet."]);
        return;
    }

    setErrors([]);
    await handleShare(recipientId, id, setErrors, setShowShareModal);
  }

  const findUserIdsBySheetId = async (sheetId, setErrors) => {
    const response = await fetch("http://localhost:8080/api/v1/userSheet/user/" + sheetId);

    if (!response.ok) {
        setErrors([`Failed to fetch user ids: ${response.status}`]);
    }

    const userIds = await response.json();
    return userIds;
  }

  // I don't think we need to worry about preventing the default event here
  const handleShare = async (recipientId, id, setErrors, setShowShareModal) => {

    if (recipientId < 1) {
      setErrors(["The recipient has either not been selected or was not found."]);
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
            setErrors([]);
            setShowShareModal(false);
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