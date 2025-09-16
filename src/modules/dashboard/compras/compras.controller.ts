import { Request, Response } from "express";

export class ComprasController {
  static register = async (req: Request, res: Response): Promise<void> => {
    try {
      res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Error en el registro" });
    }
  };
}
