const bot = async (roubo_id, requestx, night_id, first) => {
  if (first) {
    const response = await fetch("https://www.thecrims.com/api/v1/nightclubs", {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "sec-ch-ua":
          '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-request": String(requestx),
        cookie: document.cookie,
      },
      referrer: "https://www.thecrims.com/alley",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
    }).then((res) => res.json());

    if (response.user.stamina > 90) {
      console.log("Primeiro gaste sua stamina");
      return;
    }
  }

  fetch("https://www.thecrims.com/api/v1/nightclub", {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/json;charset=UTF-8",
      "sec-ch-ua":
        '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-request": String(requestx),
      cookie: document.cookie,
    },
    referrer: "https://www.thecrims.com/newspaper",
    referrerPolicy: "strict-origin-when-cross-origin",
    body:
      '{"id":"' +
      night_id +
      '","input_counters":{},"action_timestamp":' +
      Date.now() +
      "}",
    method: "POST",
    mode: "cors",
  }).then((response) => {
    return response.json().then((data) => {
      console.log("entrou na night:", data);
      if (
        data?.messages?.length > 0 &&
        data?.messages[0][0] ==
          "You must wait 5 seconds before you can enter the same nightclub again"
      ) {
        return setTimeout(function () {
          bot(roubo_id, requestx, night_id);
        }, 2000);
      }
      if (
        data?.messages?.length > 0 &&
        data?.messages[0][0] == "You have to wait 1 second before you can enter"
      ) {
        return setTimeout(function () {
          bot(roubo_id, requestx, night_id);
        }, 1000);
      }

      if (
        data?.nightclub?.products?.drugs &&
        data?.nightclub?.products?.drugs?.length == 0
      ) {
        console.log("sem drogas.");
        return;
      }

      fetch("https://www.thecrims.com/api/v1/nightclub/drug", {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
          "content-type": "application/json;charset=UTF-8",
          "sec-ch-ua":
            '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
          "sec-ch-ua-mobile": "?0",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-request": String(requestx),
          cookie: document.cookie,
        },
        referrer: "https://www.thecrims.com/newspaper",
        referrerPolicy: "strict-origin-when-cross-origin",
        body:
          '{"id":' +
          data.nightclub.products.drugs[0].id +
          ',"input_counters":{},"action_timestamp":' +
          Date.now() +
          "}",
        method: "POST",
        mode: "cors",
      }).then((response) => {
        return response.json().then((data) => {
          console.log("usou droga:", data);
          fetch("https://www.thecrims.com/api/v1/nightclub/exit", {
            headers: {
              accept: "application/json, text/plain, */*",
              "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
              "content-type": "application/json;charset=UTF-8",
              "sec-ch-ua":
                '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
              "sec-ch-ua-mobile": "?0",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "x-request": String(requestx),
              cookie: document.cookie,
            },
            referrer: "https://www.thecrims.com/newspaper",
            referrerPolicy: "strict-origin-when-cross-origin",
            body:
              '{"reason":"Manual exit","exit_key":"' +
              night_id +
              '","e_at":null,"input_counters":{},"action_timestamp":' +
              Date.now() +
              "}",
            method: "POST",
            mode: "cors",
          }).then((response) =>
            response.json().then((data) => {
              console.log("saiu da night", data);
              fetch("https://www.thecrims.com/api/v1/rob", {
                headers: {
                  accept: "application/json, text/plain, */*",
                  "accept-language": "pt-BR,pt;q=0.9",
                  "content-type": "application/json;charset=UTF-8",
                  "sec-ch-ua":
                    '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
                  "sec-ch-ua-mobile": "?0",
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "same-origin",
                  "x-request": String(requestx),
                  cookie: document.cookie,
                },
                referrer: "https://www.thecrims.com/newspaper",
                referrerPolicy: "strict-origin-when-cross-origin",
                body:
                  '{"id":' +
                  roubo_id +
                  ',"full":true,"tickets":null,"items":[],"input_counters":{},"action_timestamp":' +
                  Date.now() +
                  "}",
                method: "POST",
                mode: "cors",
              }).then((response) =>
                response.json().then((data) => {
                  console.log("roubou", data);

                  if (Number(data.user.hp) < 10) {
                    console.log("baixo hp");

                    return;
                  }

                  if (Number(data.user.tickets) < 1) {
                    console.log("sem ticket");

                    return;
                  }

                  if (
                    Number(data.user.stamina) < 100 &&
                    Number(data.user.addiction) <= 20
                  ) {
                    return setTimeout(function () {
                      bot(roubo_id, requestx, night_id);
                    }, 3000);
                  } else if (Number(data.user.addiction) > 20) {
                    fetch("https://www.thecrims.com/api/v1/hospital/detox", {
                      headers: {
                        accept: "application/json, text/plain, */*",
                        "accept-language": "pt-BR,pt;q=0.9",
                        "content-type": "application/x-www-form-urlencoded",
                        "sec-ch-ua":
                          '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
                        "sec-ch-ua-mobile": "?0",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-request": String(requestx),
                        cookie: document.cookie,
                      },
                      referrer: "https://www.thecrims.com/newspaper",
                      referrerPolicy: "strict-origin-when-cross-origin",
                      body: null,
                      method: "POST",
                      mode: "cors",
                    }).then((response) =>
                      response.json().then((data) => {
                        console.log("desintoxiquei", data);
                        return setTimeout(function () {
                          bot(roubo_id, requestx, night_id);
                        }, 3000);
                      })
                    );
                  }
                })
              );
            })
          );
        });
      });
    });
  });
};
