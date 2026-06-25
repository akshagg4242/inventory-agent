# Inventory Agent Setup Guide

## Step 1 — Create Google Sheet

Create a new Google Sheet to store inventory data.

Recommended columns:

- Item Name
- Category
- Quantity
- Status
- Updated Time

---

## Step 2 — Open Apps Script

Google Sheet
→ Extensions
→ Apps Script

---

## Step 3 — Add Script Files

Copy contents from:

appscript/Code.gs

Add additional script files if applicable.

Save project.

---

## Step 4 — Configure Triggers

Open:

Triggers
→ Add Trigger

Select required functions.

---

## Step 5 — Connect Google Chat

Configure Google Chat integration.

Allow required permissions.

---

## Step 6 — Test Automation

Example:

Input:

Add 1 HDD, New, Location: Lab 9

Expected result:

Inventory row appended automatically.

---

## Step 7 — Verify Logs

Open:

Apps Script
→ Executions

Confirm successful execution.

---

## Troubleshooting

Authorization issues:
- Re-run permissions

Sheet not updating:
- Verify trigger configuration

Chat not responding:
- Check deployment settings

---

## Status

Inventory automation verified successfully.
