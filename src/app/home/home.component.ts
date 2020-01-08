import { Component, OnInit } from "@angular/core";
import { NavComponent } from "../nav/nav.component";

const CAR_MASS_LBS = 550;
const CAR_MASS_KG = 249.4756;
const WEIGHT_N = 2447.355636;
const WHEEL_RADIUS = 0.285; // meters

// Weight transfer ratio estimates
const LR_CORNERING = 0.7;
const RF_BRAKING = 0.7;
const RF_STEADY_STATE = 0.5;
const RF_ACCELERATION = 0.3;

const VERTICAL_G = -2; // We assume a vertical g of -2 in load cases to account for bump
const SENTINEL = -1;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  steadyStateValues = {};
  brakingWithBumpValues = {};
  acceleratingWithBumpValues = {};
  jumpLandingValues = {};

  constructor() {}

  ngOnInit() {}

  steadyStateCorner(event) {
    const xVectorF = 0;
    const yVectorF = WEIGHT_N * LR_CORNERING * RF_STEADY_STATE * event.target.value;
    const zVectorF = WEIGHT_N * LR_CORNERING * RF_STEADY_STATE * VERTICAL_G;
    const zVectorR =
      WEIGHT_N * LR_CORNERING * (RF_STEADY_STATE - 1) * VERTICAL_G;
    const xVectorM = 0;
    const yVectorM = yVectorF * WHEEL_RADIUS;
    const zVectorM = 0;

    this.steadyStateValues = {
      F_FrontWheel: [xVectorF, yVectorF, zVectorF],
      F_RearWheel: [xVectorF, yVectorF, zVectorR],
      M_FrontWheel: [xVectorM, yVectorM, zVectorM],
      M_RearWheel: [xVectorM, yVectorM, zVectorM]
    };
  }

  brakingWithBump(event) {
    const xVectorF = RF_BRAKING * 0.5 * WEIGHT_N * event.target.value;
    const yVectorF = 0;
    const zVectorF = VERTICAL_G * RF_BRAKING * 0.5 * WEIGHT_N;
    const xVectorR = RF_STEADY_STATE * 0.5 * WEIGHT_N * event.target.value;
    const yVectorR = 0;
    const zVectorR = VERTICAL_G * WEIGHT_N * 0.5 * RF_STEADY_STATE;

    this.brakingWithBumpValues = {
      F_FrontWheel: [xVectorF, yVectorF, zVectorF],
      F_RearWheel: [xVectorR, yVectorR, zVectorR]
    };
  }

  acceleratingWithBump(event) {
    const xVectorF = RF_STEADY_STATE * 0.5 * WEIGHT_N * event.target.value;
    const yVectorF = 0;
    const zVectorF = RF_STEADY_STATE * 0.5 * WEIGHT_N * VERTICAL_G;
    const xVectorR = (1 - RF_ACCELERATION) * 0.5 * WEIGHT_N * event.target.value;
    const yVectorR = 0;
    const zVectorR = (1 - RF_ACCELERATION) * 0.5 * WEIGHT_N * VERTICAL_G;

    this.acceleratingWithBumpValues = {
      F_FrontWheel: [xVectorF, yVectorF, zVectorF],
      F_RearWheel: [xVectorR, yVectorR, zVectorR]
    };
  }

  // This one needs some modification, there are a few ways to design it
  jumpLanding() {
  //   const xVectorF = WEIGHT_N * event.target.value;
  //   const yVectorF = 0;
  //   const zVectorF = WEIGHT_N * event.target.value;
  //   const xVectorR = WEIGHT_N * event.target.value;
  //   const yVectorR = 0;
  //   const zVectorR = WEIGHT_N * event.target.value;

  //   this.jumpLandingValues = {
  //     F_FrontWheel: [xVectorF, yVectorF, zVectorF],
  //     F_RearWheel: [xVectorR, yVectorR, zVectorR]
  //   };
  }
}
