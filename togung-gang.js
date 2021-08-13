const botGang = async (requestx, night_id, stamina_to_rob) => {
  stamina_to_rob ? stamina_to_rob : (stamina_to_rob = 25);

  //aceita
  function aceitarGangRoubo() {
    console.log("aceitou roubo");

    const response = fetch(
      "https://www.thecrims.com/api/v1/gangrobbery/accept",
      {
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
        referrer: "https://www.thecrims.com/user/17812144",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: '{"input_counters":{},"action_timestamp":' + Date.now() + "}",
        method: "POST",
        mode: "cors",
      }
    ).then((res) => res.json());

    return response;
  }

  function executarRoubo() {
    //executa 12seg apos
    console.log("executou roubo");
    const response = fetch(
      "https://www.thecrims.com/api/v1/gangrobbery/execute",
      {
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
        referrer: "https://www.thecrims.com/user/17812144",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: '{"input_counters":{},"action_timestamp":' + Date.now() + "}",
        method: "POST",
        mode: "cors",
      }
    ).then((res) => res.json());

    return response;
  }

  const aceita = await aceitarGangRoubo();

  if (aceita.messages.length == 0) {
    //espera 14 segundos e executa
    return setTimeout(async function () {
      const exec = await executarRoubo();
      if (Number(exec?.user?.addiction) > 20) {
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
        }).then((res) => res.json());
        console.log("desintoxiquei");
      }

      if (Number(exec.user.stamina) >= Number(stamina_to_rob)) {
        return botGang(requestx, night_id, stamina_to_rob);
      } else {
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
              data.messages.length > 0 &&
              data.messages[0][0] ==
                "You must wait 5 seconds before you can enter the same nightclub again"
            ) {
              return setTimeout(function () {
                botGang(requestx, night_id, stamina_to_rob);
              }, 2000);
            }
            if (
              data.messages.length > 0 &&
              data.messages[0][0] ==
                "You have to wait 1 second before you can enter"
            ) {
              return setTimeout(function () {
                botGang(requestx, night_id, stamina_to_rob);
              }, 1000);
            }

            if (
              data.nightclub.products.drugs &&
              data.nightclub.products.drugs.length == 0
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
                    return setTimeout(function () {
                      botGang(requestx, night_id, stamina_to_rob);
                    }, 3000);
                  })
                );
              });
            });
          });
        });
      }
    }, 14000);
  } else {
    if (
      aceita.messages[0][0] ==
      "Falta-lhe estamina, descanse um pouco. Você pode descansar e esperar para que sua estamina aumente ou então entre numa rave ou boate e compre drogas. As drogas irão aumentar sua estamina mas podem fazer você ficar viciado nas drogas. As drogas também irão aumentar sua moral o que faz com que sua estamina aumente ainda mais rápido."
    ) {
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
            data.messages.length > 0 &&
            data.messages[0][0] ==
              "You must wait 5 seconds before you can enter the same nightclub again"
          ) {
            return setTimeout(function () {
              botGang(requestx, night_id, stamina_to_rob);
            }, 2000);
          }
          if (
            data.messages.length > 0 &&
            data.messages[0][0] ==
              "You have to wait 1 second before you can enter"
          ) {
            return setTimeout(function () {
              botGang(requestx, night_id, stamina_to_rob);
            }, 1000);
          }

          if (
            data.nightclub.products.drugs &&
            data.nightclub.products.drugs.length == 0
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
                  return setTimeout(function () {
                    botGang(requestx, night_id, stamina_to_rob);
                  }, 3000);
                })
              );
            });
          });
        });
      });
    }
    console.log("algo inesperado");
    // await executarRoubo();
    return;
  }
};
