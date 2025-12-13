// Script to generate 30 medical equipment products with 3 images each for MongoDB insertion
// This script outputs formatted JSON documents that can be manually inserted into MongoDB

const fs = require('fs');

// Medical equipment product data
const medicalEquipmentNames = [
    "Digital Blood Pressure Monitor",
    "Pulse Oximeter",
    "Digital Thermometer",
    "Nebulizer Machine",
    "Blood Glucose Meter",
    "Digital Weight Scale",
    "Infrared Thermometer",
    "Compression Therapy Device",
    "Electric Massager Gun",
    "Medical Nebulizer Mask Kit",
    "Blood Pressure Cuff",
    "Stethoscope Professional",
    "Medical Oxygen Concentrator",
    "Digital Fitness Tracker",
    "Medical Face Shield Pack",
    "Disposable Medical Gloves",
    "Medical Hand Sanitizer Gel",
    "Surgical Face Masks",
    "Medical Thermometer Case",
    "Orthopedic Walking Cane",
    "Medical Compression Socks",
    "Digital Body Fat Scale",
    "Medical Examination Lamp",
    "First Aid Kit Professional",
    "Medical Alcohol Wipes",
    "Blood Collection Tubes Set",
    "Medical Syringe Set",
    "Digital Pregnancy Test Kit",
    "Medical Cotton Balls Pack",
    "Emergency Medical Blanket"
];

const arabicNames = [
    "جهاز قياس ضغط الدم الرقمي",
    "جهاز قياس نبض الأكسجين",
    "ميزان حرارة رقمي",
    "جهاز تبخير",
    "جهاز قياس السكر في الدم",
    "ميزان وزن رقمي",
    "ميزان حرارة بالأشعة تحت الحمراء",
    "جهاز العلاج بالضغط",
    "مساج كهربائي",
    "مجموعة أقنعة التبخير الطبية",
    "كمامة ضغط الدم",
    "سماعة طبية احترافية",
    "جهاز تركيز الأكسجين الطبي",
    "جهاز تتبع اللياقة الرقمي",
    "عبوة دروع وجه طبية",
    "قفازات طبية قابلة للتصرف",
    "هل ت sanitizer الطبي",
    "أقنعة وجه جراحية",
    "حافظة ميزان الحرارة الطبية",
    "عصا مشية طبية",
    "جوارب ضغط طبية",
    "ميزان نسبة الدهون في الجسم الرقمي",
    "مصباح فحص طبي",
    "عدة إسعاف أولي احترافية",
    "مناديل كحول طبية",
    "مجموعة أنابيب سحب الدم",
    "مجموعة حقن طبية",
    "عدة اختبار الحمل الرقمية",
    "مجموعة مسحات قطنية طبية",
    "بطانية طبية طارئة"
];

const descriptions = [
    "Professional medical device for accurate monitoring and diagnosis",
    "Advanced healthcare equipment for home medical care",
    "Clinical grade medical instrument for precise measurements",
    "High-quality medical device designed for patient care",
    "Precision engineered medical equipment for healthcare professionals",
    "Reliable medical apparatus for continuous health monitoring",
    "State-of-the-art medical technology for improved patient outcomes",
    "Durable medical equipment built for longevity and performance",
    "Innovative medical device with cutting-edge technology",
    "Essential medical tool for healthcare facilities and home use"
];

const arabicDescriptions = [
    "جهاز طبي احترافي لمراقبة وتشخيص دقيقة",
    "معدات رعاية صحية متقدمة للعناية الطبية المنزلية",
    "أجهزة طبية من الفئة السريرية لقياسات دقيقة",
    "معدات طبية عالية الجودة مصممة للعناية بالمرضى",
    "معدات طبية مصممة بدقة هندسية لمحترفي الرعاية الصحية",
    "معدات طبية موثوقة للإشراف الصحي المستمر",
    "أحدث تقنيات الأجهزة الطبية لتحسين نتائج المرضى",
    "معدات طبية متينة مبنية على المتانة والأداء",
    "جهاز طبي مبتكر بتقنية متطورة",
    "أداة طبية أساسية لمرافق الرعاية الصحية والاستخدام المنزلي"
];

// Base URLs for medical equipment images
const imageUrls = [
    "https://images.unsplash.com/photo-1584456319363-d6a9ca8d25c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50fGVufDB8fHx8MTc1OTA3Njg0Nnw&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwZXF1aXBtZW50fGVufDB8fHx8MTc1OTA3Njg0OHw&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGhlcm1vbWV0ZXJ8ZW58MHx8fHwxNzU5MDc2ODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1586498847547-1c1e45b809d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwbW9uaXRvcnxlbnwwfHx8fDE3NTkwNzY4NTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1622059342013-b00f0dc009c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaW5zdHJ1bWVudHN8ZW58MHx8fHwxNzU5MDc2ODUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1586982919593-70f5fd07bd58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGV0aG9zY29wZXxlbnwwfHx8fDE3NTkwNzY4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
];

// Features in English and Arabic
const englishFeatures = [
    "High precision measurement",
    "Easy to use interface",
    "Durable construction",
    "Battery operated",
    "Lightweight design",
    "Digital display",
    "Memory storage",
    "Alarm function",
    "Auto shut-off",
    "Portable size"
];

const arabicFeatures = [
    "قياس عالي الدقة",
    "واجهة سهلة الاستخدام",
    "بناء متين",
    "تعمل بالبطارية",
    "تصميم خفيف الوزن",
    "شاشة رقمية",
    "تخزين الذاكرة",
    "وظيفة الإنذار",
    "إيقاف تلقائي",
    "حجم محمول"
];

// Generate 30 medical equipment products
const products = [];

for (let i = 0; i < 30; i++) {
    // Select random description
    const descIndex = Math.floor(Math.random() * descriptions.length);

    // Generate 3 random but unique image URLs for each product
    const shuffledImages = [...imageUrls].sort(() => 0.5 - Math.random());
    const selectedImages = shuffledImages.slice(0, 3);

    // Generate 4 random features for each product
    const shuffledEngFeatures = [...englishFeatures].sort(() => 0.5 - Math.random());
    const shuffledArFeatures = [...arabicFeatures].sort(() => 0.5 - Math.random());
    const selectedEngFeatures = shuffledEngFeatures.slice(0, 4);
    const selectedArFeatures = shuffledArFeatures.slice(0, 4);

    const features = [];
    for (let j = 0; j < 4; j++) {
        features.push({
            en: selectedEngFeatures[j],
            ar: selectedArFeatures[j]
        });
    }

    // Generate random prices (between 15 and 500)
    const price = parseFloat((Math.random() * 485 + 15).toFixed(2));
    const originalPrice = parseFloat((price * (1.1 + Math.random() * 0.4)).toFixed(2));

    // Generate random stock (between 5 and 200)
    const stock = Math.floor(Math.random() * 195 + 5);

    // Generate random rating (between 3.5 and 5.0)
    const rating = parseFloat((Math.random() * 1.5 + 3.5).toFixed(1));

    const product = {
        name: {
            en: medicalEquipmentNames[i],
            ar: arabicNames[i]
        },
        description: {
            en: descriptions[descIndex],
            ar: arabicDescriptions[descIndex]
        },
        category: "medical",
        price: price,
        originalPrice: originalPrice,
        stock: stock,
        images: selectedImages,
        features: features,
        rating: rating,
        isNew: Math.random() > 0.7, // 30% chance of being new
        isFeatured: Math.random() > 0.8, // 20% chance of being featured
        isPopular: Math.random() > 0.6 // 40% chance of being popular
    };

    products.push(product);
}

// Convert to MongoDB insert format
let output = "// MongoDB Insert Commands for 30 Medical Equipment Products\n";
output += "// Copy and paste these commands into your MongoDB shell\n\n";

products.forEach((product, index) => {
    output += `db.products.insertOne(${JSON.stringify(product, null, 2)});\n\n`;
});

// Write to file
fs.writeFileSync('medical-products-insert.js', output);

console.log("Generated 30 medical equipment products with 3 images each.");
console.log("Output saved to medical-products-insert.js");
console.log("You can now manually insert these products into your MongoDB database.");

// Also save as JSON for alternative import methods
fs.writeFileSync('medical-products.json', JSON.stringify(products, null, 2));
console.log("JSON format also saved to medical-products.json");