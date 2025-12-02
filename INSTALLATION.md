# دليل التثبيت السريع - Quick Installation Guide

## إذا واجهت مشكلة في تنفيذ الأوامر (ExecutionPolicy)

### الحل 1: تغيير سياسة التنفيذ مؤقتاً
افتح PowerShell كمسؤول وقم بتنفيذ:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

ثم في نفس النافذة:
```powershell
cd "C:\Users\elhaj\Desktop\Coding projects\qur2an app"
npm install
```

### الحل 2: استخدام Command Prompt (CMD)
افتح CMD واذهب للمجلد:
```cmd
cd "C:\Users\elhaj\Desktop\Coding projects\qur2an app"
npm install
```

## خطوات التشغيل

### 1. تثبيت الحزم (أول مرة فقط)
```bash
npm install
```

هذا قد يستغرق 5-10 دقائق في المرة الأولى.

### 2. تشغيل المشروع
```bash
npm start
```

أو:
```bash
ng serve
```

### 3. فتح المتصفح
انتظر حتى يكتمل التشغيل ثم افتح:
```
http://localhost:4200
```

## إذا كان Angular CLI غير مثبت

قم بتثبيت Angular CLI عالمياً:
```bash
npm install -g @angular/cli
```

## حل مشاكل شائعة

### المشكلة: "ng is not recognized"
**الحل**: ثبت Angular CLI:
```bash
npm install -g @angular/cli
```

### المشكلة: خطأ في المنافذ (Port already in use)
**الحل**: استخدم منفذ آخر:
```bash
ng serve --port 4201
```

### المشكلة: خطأ في الذاكرة
**الحل**: زِد الذاكرة المسموحة:
```bash
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm start
```

## البناء للإنتاج

```bash
npm run build
```

الملفات النهائية في: `dist/islamic-website/`

## التحديثات

لتحديث الحزم:
```bash
npm update
```

## تنظيف الملفات المؤقتة

```bash
rm -r node_modules
rm package-lock.json
npm install
```

---

## ملاحظات مهمة

1. **Node.js**: تأكد من تثبيت Node.js v18 أو أحدث
2. **npm**: تأكد من تثبيت npm v9 أو أحدث
3. **المساحة**: احتاج على الأقل 500MB للـ node_modules
4. **الإنترنت**: احتاج اتصال إنترنت للتثبيت الأول

## فحص النسخ المثبتة

```bash
node --version
npm --version
ng version
```

---

**للمساعدة الإضافية، راجع الملف README.md**
