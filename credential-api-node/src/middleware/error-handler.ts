import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { env } from "../config/env.js";
import { HttpError } from "../errors/http-error.js";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof HttpError) {
    if (error.statusCode === 204) {
      res.status(204).send();
      return;
    }

    res.status(error.statusCode).json({
      message: error.message,
    });
    return;
  }

  if (error instanceof ZodError) {
    res.status(500).json({
      message: "University server has an error",
      ...(env.NODE_ENV !== "production" ? { issues: error.issues } : {}),
    });
    return;
  }

  res.status(500).json({
    message: "University server has an error",
  });
};
