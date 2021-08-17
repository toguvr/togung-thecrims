const bot = async (requestx, first) => {
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

  function escolheNights() {
    console.log("escolhendo night");
    const response = fetch("https://www.thecrims.com/api/v1/nightclubs", {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "pt-BR,pt;q=0.9",
        "sec-ch-ua":
          '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-request": String(requestx),
        cookie: document.cookie,
      },
      referrer: "https://www.thecrims.com/gang/2903/members",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
    }).then((res) => res.json());

    return response;
  }

  function procuraRoubos() {
    const response = fetch("https://www.thecrims.com/api/v1/robberies", {
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
      referrer: "https://www.thecrims.com/newspaper",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
    }).then((res) => res.json());

    return response;
  }

  const roubos = await procuraRoubos();

  const roubosSucesso = roubos.single_robberies.filter(
    (roubo) => roubo.successprobability == 100
  );

  console.log(roubosSucesso);

  const roubo = roubosSucesso.sort(function (a, b) {
    if (a.difficulty > b.difficulty) {
      return -1;
    }
    if (a.difficulty < b.difficulty) {
      return 1;
    }
    return 0;
  });

  roubo_id = roubo[0].id;

  const nights = await escolheNights();
  const night = nights.nightclubs.find((night) => night.business_id == 1);
  const night_id = night.id;

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
    return response.json().then(async (data) => {
      console.log("entrou na night:", data);

      if (
        data?.messages?.length > 0 &&
        data?.messages[0][0] ==
          "You must wait 5 seconds before you can enter the same nightclub again"
      ) {
        return setTimeout(function () {
          bot(requestx, false);
        }, 2000);
      }
      if (
        data?.messages?.length > 0 &&
        data?.messages[0][0] == "You have to wait 1 second before you can enter"
      ) {
        return setTimeout(function () {
          bot(requestx, false);
        }, 1000);
      }

      if (
        data?.nightclub?.products?.drugs &&
        data?.nightclub?.products?.drugs?.length == 0
      ) {
        return setTimeout(function () {
          bot(requestx, false);
        }, 3000);
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
                  Number(roubo_id) +
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
                      bot(requestx, false);
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
                          bot(requestx, false);
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
