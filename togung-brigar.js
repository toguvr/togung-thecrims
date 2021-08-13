const procurarbriga = async (requestx, respect_to_fight) => {
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

  function saiNight(night_id) {
    console.log("saiu da night");

    const response = fetch("https://www.thecrims.com/api/v1/nightclub/exit", {
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
      referrer: "https://www.thecrims.com/gang/2903/members",
      referrerPolicy: "strict-origin-when-cross-origin",
      body:
        '{"reason":"Manual exit","exit_key":"' +
        night_id +
        '","e_at":null,"input_counters":{},"action_timestamp":' +
        Date.now() +
        "}",
      method: "POST",
      mode: "cors",
    }).then((res) => res.json());

    return response;
  }

  function entraNight(night_id) {
    console.log("entrou na night", night_id);
    const response = fetch("https://www.thecrims.com/api/v1/nightclub", {
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
    }).then((res) => res.json());

    return response;
  }

  function useDroga(droga_id) {
    console.log("usou droga");

    const response = fetch("https://www.thecrims.com/api/v1/nightclub/drug", {
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
      referrer: "https://www.thecrims.com/gang/2903/members",
      referrerPolicy: "strict-origin-when-cross-origin",
      body:
        '{"id":' +
        droga_id +
        ',"input_counters":{},"action_timestamp":' +
        Date.now() +
        "}",
      method: "POST",
      mode: "cors",
    }).then((res) => res.json());

    return response;
  }

  function procuraVisitante() {
    console.log("ve visitantes");

    const response = fetch(
      "https://www.thecrims.com/api/v1/nightclub/visitors",
      {
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
        referrer: "https://www.thecrims.com/newspaper",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
      }
    ).then((res) => res.json());

    return response;
  }

  function atacarOtario(victim_id, encountered_at, assault_key) {
    console.log("ataca otario");

    const response = fetch("https://www.thecrims.com/api/v1/attack", {
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
      referrer: "https://www.thecrims.com/alley",
      referrerPolicy: "strict-origin-when-cross-origin",
      body:
        '{"victim_id":' +
        victim_id +
        ',"encountered_at":' +
        encountered_at +
        ',"assault_key":"' +
        assault_key +
        '","created_at":' +
        Date.now() +
        ',"input_counters":{},"action_timestamp":' +
        Date.now() +
        "}",
      method: "POST",
      mode: "cors",
    }).then((res) => res.json());

    return response;
  }

  const nights = await escolheNights();

  if (nights.user.respect < respect_to_fight) {
    console.log("o respeito escolhido e maior que o teu em...");
    return;
  }

  const nightId = nights.nightclubs.find((night) => night.business_id == 1);
  const night = await entraNight(nightId.id);

  if (nights.user.stamina < 90) {
    if (night.nightclub.products.drugs.length > 0) {
      await useDroga(night.nightclub.products.drugs[0].id);
      await saiNight(nightId.id);
      return setTimeout(function () {
        procurarbriga(requestx, respect_to_fight);
      }, 1000);
    } else {
      await saiNight(nightId.id);
      return setTimeout(function () {
        procurarbriga(requestx, respect_to_fight);
      }, 1000);
    }
  } else {
    const visitantes = await procuraVisitante();
    if (Array.isArray(visitantes)) {
      if (visitantes.length === 0) {
        await saiNight(nightId.id);

        return setTimeout(function () {
          procurarbriga(requestx, respect_to_fight);
        }, 1000);
      } else {
        const visitanteParaApanhar = visitantes.find(
          (visitante) => visitante.respect <= respect_to_fight
        );
        if (!visitanteParaApanhar) {
          await saiNight(nightId.id);
          return setTimeout(function () {
            procurarbriga(requestx, respect_to_fight);
          }, 10);
        } else {
          console.log(
            "OTARIO vai morrer com respeito:",
            visitanteParaApanhar.respect
          );
          await atacarOtario(
            visitanteParaApanhar.id,
            visitanteParaApanhar.encountered_at,
            visitanteParaApanhar.assault_key
          );
          await saiNight(nightId.id);
          return setTimeout(function () {
            procurarbriga(requestx, respect_to_fight);
          }, 100);
        }
      }
    } else {
      if (
        !!visitantes?.redirect_to &&
        visitantes.redirect_to === "/newspaper#/rip"
      ) {
        return setTimeout(function () {
          procurarbriga(requestx, respect_to_fight);
        }, 1860000);
      }
    }
  }
};
