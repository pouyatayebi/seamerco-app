import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve("../seamerco-content/fa/used-equipment/items");

const items = [
  ["used-4-head-seamer", "machine", "ماشین دربندی", "دستگاه دربند چهار هد دست دوم", "دربندی سریع قوطی فلزی", "تا ۲۴۰ قوطی در دقیقه", "بازسازی‌شده"],
  ["used-6-head-seamer", "machine", "ماشین دربندی", "دستگاه دربند شش هد دست دوم", "مناسب خطوط کنسروی با ظرفیت بالا", "تا ۳۶۰ قوطی در دقیقه", "آماده بازدید"],
  ["used-glass-jar-seamer", "machine", "ماشین دربندی", "دستگاه دربند شیشه دست دوم", "دربندی ظروف شیشه‌ای", "متناسب با سایز ظرف", "در حال بازسازی"],
  ["used-12-nozzle-filler", "machine", "ماشین فیلر", "فیلر ۱۲ نازل دست دوم", "پرکردن محصولات نیمه‌غلیظ", "تا ۶۰۰۰ ظرف در ساعت", "بازسازی‌شده"],
  ["used-8-nozzle-filler", "machine", "ماشین فیلر", "فیلر ۸ نازل دست دوم", "پرکن مناسب سس و رب", "تا ۴۰۰۰ ظرف در ساعت", "آماده فروش"],
  ["used-piston-filler", "machine", "ماشین فیلر", "فیلر پیستونی دست دوم", "پرکردن دقیق مواد غلیظ", "متناسب با محصول", "آماده بازدید"],
  ["used-continuous-evaporator", "machine", "ماشین‌آلات تغلیظ", "اواپراتور کانتینیوس دست دوم", "تغلیظ صنعتی رب گوجه", "۱ تا ۳۰ تن در ساعت", "در حال بازسازی"],
  ["used-batch-cooker", "machine", "ماشین‌آلات پخت", "دیگ پخت بچ دست دوم", "پخت محصولات غذایی", "متناسب با حجم دیگ", "آماده فروش"],
  ["used-retort", "machine", "استریلیزاسیون", "ریتورت دست دوم", "استریلیزاسیون محصولات کنسروی", "متناسب با سبد", "بازسازی‌شده"],
  ["used-pasteurizer", "machine", "پاستوریزاسیون", "پاستوریزاتور دست دوم", "پاستوریزاسیون محصول بسته‌بندی‌شده", "متناسب با خط", "آماده بازدید"],
  ["used-can-washer", "machine", "آماده‌سازی قوطی", "قوطی‌شوی دست دوم", "شستشوی قوطی پیش از پرکنی", "ظرفیت متوسط", "آماده فروش"],
  ["used-exhaust-box", "machine", "اکسهاست", "اکسهاست باکس دست دوم", "هواگیری قوطی پیش از دربندی", "متناسب با خط", "بازسازی‌شده"],
  ["used-labeling-machine", "machine", "بسته‌بندی", "لیبل‌زن دست دوم", "لیبل‌زنی ظروف و قوطی", "متناسب با ظرف", "آماده فروش"],
  ["used-capping-machine", "machine", "دربندی", "دستگاه کپینگ دست دوم", "دربندی ظروف پلاستیکی و شیشه‌ای", "متناسب با درب", "آماده بازدید"],
  ["used-depalletizer", "machine", "انتقال", "دیپالتایزر دست دوم", "تغذیه اتوماتیک قوطی", "ظرفیت بالا", "در حال بازسازی"],
  ["used-conveyor-system", "machine", "انتقال", "نوار نقاله خط تولید دست دوم", "انتقال محصول بین ماشین‌آلات", "قابل سفارشی‌سازی", "آماده فروش"],
  ["used-cip-system", "machine", "شستشوی صنعتی", "سیستم CIP دست دوم", "شستشوی مدار بسته خط تولید", "متناسب با خط", "بازسازی‌شده"],
  ["used-tomato-crusher", "machine", "آماده‌سازی گوجه", "کراشر گوجه دست دوم", "خردایش گوجه در ابتدای خط", "ظرفیت متوسط", "آماده فروش"],
  ["used-preheater", "machine", "پیش‌گرمایش", "پری‌هیتر دست دوم", "پیش‌گرمایش محصول پیش از فرآوری", "متناسب با ظرفیت", "آماده بازدید"],
  ["used-sterilization-tunnel", "machine", "استریلیزاسیون", "تونل استریلیزاسیون دست دوم", "استریلیزاسیون ظروف و بسته‌بندی", "متناسب با خط", "در حال بازسازی"],

  ["used-tomato-paste-line", "production-line", "خط تولید کامل", "خط تولید رب گوجه دست دوم", "خط کامل فرآوری و تغلیظ رب", "متناسب با سفارش", "قابل بازسازی"],
  ["used-beans-canning-line", "production-line", "خط تولید کامل", "خط تولید کنسرو حبوبات دست دوم", "خط کامل آماده‌سازی و کنسرو حبوبات", "ظرفیت صنعتی", "آماده بررسی"],
  ["used-tuna-canning-line", "production-line", "خط تولید کامل", "خط تولید کنسرو تن ماهی دست دوم", "خط تولید و بسته‌بندی تن ماهی", "ظرفیت صنعتی", "در حال بازسازی"],
  ["used-pickles-line", "production-line", "خط تولید کامل", "خط تولید ترشیجات دست دوم", "خط آماده‌سازی و بسته‌بندی ترشیجات", "متناسب با محصول", "آماده بازدید"],
];

function yaml([slug, type, category, title, subtitle, capacity, condition]) {
  return `seo:
  title: "${title}"
  description: "بررسی و خرید ${title} برای خطوط تولید صنایع غذایی"

title: "${title}"
subtitle: "${subtitle}"
excerpt: "${title} گزینه‌ای اقتصادی برای راه‌اندازی یا توسعه خطوط تولید صنایع غذایی است و پس از بررسی فنی، امکان بازسازی و آماده‌سازی برای بهره‌برداری مجدد را دارد."

type: "${type}"
category: "${category}"
relatedSolutions:
  - "tomato"

status: "available"
condition: "${condition}"
capacity: "${capacity}"
code: "${slug.toUpperCase().replaceAll("-", "_")}"

featuredImage: "card.webp"

hero:
  title: "${title}"
  subtitle: "${subtitle}"
  poster: "hero.jpg"
  backgroundType: "image"
  logotype: false
  badge: false

specs:
  - label: "نوع تجهیز"
    value: "${category}"
  - label: "وضعیت"
    value: "${condition}"
  - label: "ظرفیت"
    value: "${capacity}"

gallery:
  - image: "gallery-1.webp"
    alt: "${title}"
  - image: "gallery-2.webp"
    alt: "${title}"
`;
}

await fs.mkdir(root, { recursive: true });

for (const item of items) {
  const dir = path.join(root, item[0]);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, "index.yaml"), yaml(item), "utf8");
}

console.log(`Created ${items.length} used-equipment items.`);