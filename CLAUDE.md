# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GökServis is a Turkish in-orbit space servicing company concept. The repository is in the **pre-implementation stage** — technical architecture and business documentation are complete in `docs/gokservis.md`, but no source code exists yet. The IDE is configured for **Python 3.12** (PyCharm).

## Development Commands

No build system exists yet. As implementation begins, commands will be added here.

## Architecture

The platform is built around two cooperating hardware platforms:

### KUTAY (Orbital Hub / Depot)
- Stationary in GEO/LEO orbit — does not travel to client satellites
- Manages cryogenic and chemical fuel storage (MLI insulation + active cooling)
- Houses the "Ameliyathane" (surgical) robotic repair module with spare parts
- Multi-port "Gök-Dock" docking stations for GEZGİN vehicles and resupply tankers
- PMD (Propellant Management Devices) for zero-gravity fluid handling via capillary action
- Receives resupply from low-cost single-use tankers launched from the Somali Space Port

### GEZGİN (Light Service Tug / Mobile Unit)
- Autonomous/remotely controlled — acts as KUTAY's mobile arm
- Hybrid propulsion: chemical thrusters for fast transit + cold gas/ion thrusters for precision docking
- 24-thruster RCS for 6-DOF maneuvering
- Universal Port Adaptor (UPA): modular docking head compatible with all major satellite manufacturers (Lockheed, Boeing, Airbus, etc.)
- 7-axis dual robotic arms for repair, part replacement, and Edge Computing module installation
- 3D LIDAR + AI optical systems for autonomous rendezvous and proximity operations (RPO)
- Radiation-hardened SoC for autonomous decision-making
- Modular fuel capacity: 50–500 kg
- Operational loop: dock at KUTAY → load fuel/parts → transit to client satellite → service → return

### Supply Chain
- Low-cost "dumb tankers" launched from Somali Turkish Space Port (equatorial launch advantage)
- Autonomous docking with KUTAY for fuel transfer
- Empty tanks either de-orbited or repurposed as modular structural components on KUTAY

## Services Offered
1. **Refueling** — chemical (Hydrazine) or electric (Xenon/Krypton) propellant transfer to GEO/LEO satellites
2. **Servicing** — inspection, robotic activation of stuck panels/antennas, Edge Computing module upgrades
3. **Repair** — emergency robotic intervention for mechanical or electrical failures
4. **Towing & Logistics** — last-mile delivery from drop orbit to target orbit, and controlled de-orbit/graveyard orbit transfers

## Revenue Model (SPaaS)
- Life Extension fee (fuel + service per kg)
- "Gök-Güvence" annual subscription retainer with SLA guarantees
- Edge-as-a-Service (per-module installation + software license)
- Per-mission logistics/de-orbiting fees

## Strategic Roadmap
- **Phase 1 (2026–2029)**: R&D at TUSAŞ/UZAAY facilities, Somali port construction
- **Phase 2 (2030–2035)**: Launches, KUTAY orbital deployment (2032), GEZGİN deployment (2033)
- **Phase 3 (2036–2038)**: STM certification, pilot government missions, insurance agreements
- **Phase 4 (2039+)**: First commercial billing, Gök-Güvence subscriptions, fleet scale-up to 20+ GEZGİN vehicles
