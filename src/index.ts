import core from '@actions/core';
import axios from "axios";

const pagerduty = {
  url: "https://api.pagerduty.com",
  token: core.getInput('pagerduty_token'),
  from: core.getInput('pagerduty_from'),
  serviceId: core.getInput('pagerduty_service_id'),
};

(async () => {
  try {
    const resp = await axios.get(core.getInput('endpoint'));

    core.setOutput("status", resp.status);
  } catch (e) {
    await axios.post(
      `${pagerduty.url}/incidents`,
      {
        incident: {
          type: "incident",
          title: `Health check is failing for ${core.getInput('endpoint')}`,
          service: {
            id: pagerduty.serviceId,
            type: "service_reference",
          },
        },
      },
      {
        headers: {
          Authorization: `Token token=${pagerduty.token}`,
          From: pagerduty.from,
          Accept: "application/vnd.pagerduty+json;version=2",
        },
      }
    );

    core.setOutput("status", e.status);
  }
})().catch((err) => {
  core.setFailed(err.message);

  console.error("[PAGERDUTY-ERROR]", {
    data: err.response.data,
    headers: err.response.headers,
    status: err.response.status,
  })
});
