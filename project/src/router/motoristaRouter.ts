import { Router } from "express";
import { MotoristaRepositoryMemory } from "../repositories/motorista/MotoristaRepositoryMemory";

const router = Router();

const repository = new MotoristaRepositoryMemory();

export default router;