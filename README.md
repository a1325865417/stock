# stock

VIP复盘网复刻（前后端）。

## 结构
- backend: FastAPI + MySQL
- frontend: Vite + React

## 运行

### 后端
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -e .
uvicorn app.main:app --reload
```

### 前端
```bash
cd frontend
npm install
npm run dev
```

## 说明
- 站点结构来自 `~/Desktop/fupanwang_prd.md`
- 站点脑图来自 `~/Desktop/fupanwang_mindmap.md`
