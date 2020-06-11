# Uptime check with pagerduty incident integration

Pagerduty allows to creat incidents via API. 
This action checks if a specific endpoint is reachable and creates an incident in case it's not working.

see here for more information on the incindens API: https://developer.pagerduty.com/docs/incident-creation-api


## Inputs

### `pagerduty_token`

**Required** Your pagerduty token.


### `pagerduty_from`

**Required** The email address of a valid PagerDuty user on the account associated with the auth token.


### `pagerduty_service_id`

**Required** Your pagerduty service id.

You can find it here:


### `endpoint`

**Required** The endpoint you want to check.


## Outputs

### `status`

The response status we received.


## Example usage

```
uses: keylightberlin/pagerdutyuptime@v1
with:
  pagerduty_token: 'My Token'
  pagerduty_from: 'hello@keylight.de'
  pagerduty_service_id: 'S12345'
  endpoint: 'https://keylight.de'  
```

## Example for checking multiple endpoints:


```

on:
  schedule:
    - cron:  '*/5 * * * *'
jobs:
  hello_world_job:
    runs-on: ubuntu-latest
    name: uptime check
    strategy:
      matrix:
        endpoint: ["https://keylight.de", "https://subscription-suite.com"]
    steps:
      - uses: keylightberlin/pagerduty-downtime-incident@v2
        with:
          pagerduty_token: ${{ secrets.PAGERDUTY_TOKEN }}
          pagerduty_from: 'hello@keylight.de'
          pagerduty_service_id: ${{ secrets.PAGERDUTY_SERVICE_ID }}
          endpoint: ${{ matrix.endpoint }}
```
