---
title: "Cloud Services and Cost Control"
description: "Identify cloud services, estimate costs with fictional data, and design useful alerts without mistaking a budget for an automatic spending cap."
module: "09-de-tu-equipo-a-la-nube"
order: 2
duration: 30
level: "Intermediate"
objectives:
  - "Relate compute, storage, databases, and networking to an application's needs."
  - "Calculate a hypothetical budget locally from synthetic line items."
  - "Explain why cloud alerts are not, by themselves, a spending limit."
prerequisites:
  - "Be able to run commands in a terminal."
  - "Understand that a service can consume resources while it remains active."
updatedDate: '2026-10-08'
sources:
  - label: "AWS Budgets: creating and tracking budgets"
    url: "https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-create.html"
  - label: "Google Cloud Billing: budgets and alerts"
    url: "https://docs.cloud.google.com/billing/docs/how-to/budgets"
  - label: "AWS Budgets: refresh frequency and alerts"
    url: "https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html"
  - label: "Google Cloud: budgets with supported spending limits"
    url: "https://docs.cloud.google.com/billing/docs/how-to/budgets-spend-caps"
---

## What using the cloud means

The cloud lets you request computing capacity from a provider through managed services and networks available on demand. An application combines compute, storage, a database, networking, identity, and monitoring. Each resource needs permissions and oversight; for example, a machine runs code, an object stores images, and a managed database keeps records. “Cloud” does not eliminate servers: it delegates some of their operation and billing.

Distinguish the service model from the deployment decision. A virtual machine gives you control of the operating system, but also requires you to maintain it. A managed database simplifies backups and patches, though it still needs design, permissions, and monitoring. An on-demand function suits some tasks, but may charge per invocation, duration, or associated resources. The choice is not about picking the newest option: relate maintenance, availability, workload, and budget.

Costs may depend on uptime, CPU and memory, occupied space, number of operations, backups, data sent out to the Internet, region, and support. An idle prototype may continue to incur charges for storage, a reserved IP address, or other resources. Tagging resources by project, separating environments, reviewing the inventory, and deleting what is not needed are good operational habits. Before creating anything, confirm who pays, how it is shut down, and what permissions it needs; do not put credentials in code or screenshots.

## A budget, an alert, and a limit are not synonyms

A budget states how much you plan to spend in a period and lets you compare forecasts or recorded costs with that plan. Alerts at 50%, 80%, or 100% give you time to investigate; they are not necessarily barriers that reject new requests. In Google Cloud, an “alerts only” budget reports information but does not automatically stop usage or billing; a separate spending-limit option exists for supported services. AWS Budgets refreshes its information up to three times a day, usually 8–12 hours after the previous update; a notice may arrive late while spending continues to change.

Google Cloud also offers spending-limit budgets for an eligible project and service; this is not the “alerts only” behavior. They can pause new use of the selected service, but they are not instantaneous: in-progress requests and persistent resources may still incur charges. AWS Budgets also lets you configure control actions, which require permissions and review. None of these options replaces shutting down resources, reviewing bills, and agreeing on responsibilities. A well-managed budget combines a forecast, alerts with a recipient, frequent review, and an explicit plan to reduce consumption.

## Local activity

1. Run the following block with Python 3. It only adds fictional amounts in memory: it does not look up prices, needs no account, and creates no resources.
2. Check the amount over budget, then change `"computo": 12` to `18` to see how the result changes.

```sh
python3 - <<'PY'
partidas = {"computo": 12, "almacenamiento": 3, "base_datos": 9, "red": 5}
presupuesto = 25
estimacion = sum(partidas.values())
porcentaje = estimacion / presupuesto * 100
print(f"Estimación hipotética: €{estimacion:.2f}")
print(f"Uso del presupuesto: {porcentaje:.1f}%")
if estimacion >= presupuesto:
    print("ALERTA local: revisar las partidas antes de continuar")
PY
```


`partidas` is a dictionary of invented data; `sum` calculates the total; and the percentage compares that total with the plan. The condition only prints a warning: it blocks nothing, just as an informational alert does not by itself stop a platform. This teaching scenario assumes all amounts cover the same period and use the same currency.

## Verification and outcome

The first run should show 29 euros and 116.0% of the €25 budget, along with the local alert. After changing compute to 18, the total becomes 35 euros and the percentage 140.0%. These values are not rates or a provider forecast; they are for practicing how to read a variance. The activity stays on your machine, with no cloud project, card, API, or billing account.

## Common errors and solutions

Adding amounts from different periods produces a misleading comparison: normalize each line item to a month or an hour before calculating. Mixing euros and dollars also invalidates the total; define one currency and do not assume conversion is free or fixed. Forgetting traffic, backups, or idle resources tends to underestimate spending; write down assumptions and leave a margin. If an alert does not arrive after crossing a threshold, check its scope, recipient, and data refresh; do not conclude that the service is blocked. A forecast is a signal to act, not a final bill or a guaranteed cap.

## Summary

Cloud services provide capacity and managed components in exchange for variable operation and costs. Before using them, identify resources, owners, permissions, the billing period, and how to shut them down. Budgets and alerts help detect variances, but Google Cloud's alerts-only budgets do not stop spending, and AWS notices may be delayed. The local exercise turns synthetic figures into an understandable signal; it does not provision services or reproduce a provider's rates. Use estimates for planning and real checks, with appropriate permissions, only when there is an authorized project.
