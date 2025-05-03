# ♻️ RRR

## 📝 O que é?

O **RRR** é uma plataforma para conectar pessoas e empresas que desejam descartar de forma adequada seus produtos indesejados.

## 🎯 Objetivos

- Reduzir descarte incorreto
- Reduzir desperdicio
- Reduzir poluição
- Auxiliar pessoas que necessitam de produtos recicláveis
- Auxiliar empresas que desejam descartar de forma adequada seus produtos indesejados

### 🎲 Banco de Dados

#### 🔷 Modelo Entidade Relacionamento

![Modelo ER](./docs/MER.png)

#### 🔷 Modelo Relacional

#### user

| Campo           | Tipo                     | Nulo     |
| --------------- | ------------------------ | -------- |
| id              | 🔑 Primary Key Text UUID | NOT NULL |
| name            | Text                     | NOT NULL |
| email           | Text                     | NOT NULL |
| whatsapp_number | Text                     | NOT NULL |
| password        | Text                     | NOT NULL |
