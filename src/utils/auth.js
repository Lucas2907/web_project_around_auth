import express from "express";
const router = express.Router();

router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  res.send({ message: "Usuário registrado com sucesso" });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  res.send({ message: "Usuário logado com sucesso" });
});

export function authMiddleware(req, res, next) {
  const auth = false;
  if (!auth) {
    return res.redirect("/signin");
  }
  next();
}

export default router;
