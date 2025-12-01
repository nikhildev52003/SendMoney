import { Router } from "express";
import { authMiddleware } from "../middlewere/middleware.js";
import { fetchBalance,TransactionHstry,TransferAmount } from "../controller/account.js";
export const routerr = Router();

routerr.get('/balance',authMiddleware,fetchBalance)
routerr.post('/transfer',authMiddleware,TransferAmount)
routerr.get('/transaction',authMiddleware,TransactionHstry)
