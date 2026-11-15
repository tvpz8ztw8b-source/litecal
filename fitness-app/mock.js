// mock.js —— 单一数据源（原型假数据）
// 后续接入微信云开发后，这些数据将替换为云数据库集合，见 api.js 中的映射注释。
window.DB = {
  // 用户画像：goal 三大总目标 cut=减脂(热量缺口) / bulk=增肌(热量盈余) / maintain=维持现状(热量平衡)
  profile: {
    nickname: '阿健',
    gender: 'male',
    age: 28,
    heightCm: 175,
    activity: 1.55,          // 活动系数：1.2 久坐 / 1.375 轻度 / 1.55 中度 / 1.725 高强度
    goal: 'cut',
    pace: 'mid',             // 速率：slow 慢速 / mid 中速 / fast 快速（减脂、增肌通用）
    weeks: 6,                // 减脂/增肌周期（周，用户自设 1-52；中速 0.5kg/周 × 6周 ≈ 3.2kg 目标差）
    startWeight: 78.2,
    goalWeight: 70.0,
    streak: 21,
    startDate: '2026-08-01',
  },

  // 动作库（含 MET 值，用于预估消耗：kcal = MET × 体重kg × 小时）
  exerciseLib: {
    cardio: [
      { name: '跑步', met: 8.5 }, { name: '跳绳', met: 10 }, { name: '快走', met: 4.3 },
      { name: '骑行', met: 7 }, { name: '椭圆机', met: 5 }, { name: '游泳', met: 8 },
    ],
    strength: [
      { name: '深蹲', met: 5.5 }, { name: '硬拉', met: 6 }, { name: '平板卧推', met: 5 },
      { name: '引体向上', met: 6 }, { name: '坐姿推肩', met: 5 }, { name: '哑铃弯举', met: 4.5 },
    ],
    functional: [
      { name: '波比跳', met: 9 }, { name: '壶铃摇摆', met: 8 }, { name: '战绳', met: 8.5 },
      { name: '药球摔掷', met: 7.5 }, { name: '登山跑', met: 8 },
    ],
  },

  // 训练模板：一键复用，快速创建记录
  templates: [
    {
      id: 't1', name: '推胸力量日', category: 'strength', rpe: 7,
      desc: '卧推 + 上斜 + 下压 · 约 50 分钟', kcal: 348, duration: 50,
      items: [
        { name: '平板卧推', sets: 4, reps: 10, weightKg: 60 },
        { name: '上斜哑铃卧推', sets: 3, reps: 12, weightKg: 22 },
        { name: '绳索下压', sets: 3, reps: 15, weightKg: 25 },
      ],
    },
    {
      id: 't2', name: '燃脂跳绳间歇', category: 'cardio', rpe: 6,
      desc: '跳绳 10 组 × 1 分钟 · 约 30 分钟', kcal: 362, duration: 30,
      items: [{ name: '跳绳', sets: 10, reps: 1, weightKg: null }],
    },
    {
      id: 't3', name: '壶铃功能性循环', category: 'functional', rpe: 8,
      desc: '壶铃 + 波比 + 登山跑 · 约 35 分钟', kcal: 402, duration: 35,
      items: [
        { name: '壶铃摇摆', sets: 4, reps: 15, weightKg: 16 },
        { name: '波比跳', sets: 4, reps: 12, weightKg: null },
        { name: '登山跑', sets: 4, reps: 30, weightKg: null },
      ],
    },
  ],

  foodLib: [
    { name: '米饭', unit: '100g', kcal: 116, protein: 2.6, carbs: 25.9, fat: 0.3 },
    { name: '鸡胸肉', unit: '100g', kcal: 133, protein: 24.6, carbs: 0.4, fat: 3.3 },
    { name: '鸡蛋', unit: '1个', kcal: 72, protein: 6.3, carbs: 0.6, fat: 5.0 },
    { name: '全麦面包', unit: '1片', kcal: 69, protein: 3.1, carbs: 12.4, fat: 1.2 },
    { name: '牛奶', unit: '250ml', kcal: 135, protein: 8.0, carbs: 12.0, fat: 7.0 },
    { name: '燕麦', unit: '50g', kcal: 184, protein: 5.4, carbs: 33.0, fat: 3.4 },
    { name: '西兰花', unit: '100g', kcal: 34, protein: 2.8, carbs: 6.6, fat: 0.4 },
    { name: '牛肉', unit: '100g', kcal: 250, protein: 26.0, carbs: 0, fat: 15.0 },
    { name: '三文鱼', unit: '100g', kcal: 208, protein: 20.0, carbs: 0, fat: 13.0 },
    { name: '香蕉', unit: '1根', kcal: 89, protein: 1.1, carbs: 22.8, fat: 0.3 },
    { name: '苹果', unit: '1个', kcal: 52, protein: 0.3, carbs: 13.8, fat: 0.2 },
    { name: '红薯', unit: '100g', kcal: 86, protein: 1.6, carbs: 20.1, fat: 0.1 },
    { name: '豆腐', unit: '100g', kcal: 76, protein: 8.1, carbs: 1.9, fat: 4.8 },
    { name: '鸡腿', unit: '100g', kcal: 181, protein: 18.0, carbs: 0, fat: 12.0 },
    { name: '酸奶', unit: '100g', kcal: 72, protein: 2.5, carbs: 9.3, fat: 2.7 },
    { name: '混合坚果', unit: '25g', kcal: 150, protein: 4.0, carbs: 6.0, fat: 13.0 },
    { name: '紫薯', unit: '100g', kcal: 82, protein: 1.6, carbs: 18.9, fat: 0.2 },
    { name: '玉米', unit: '1根', kcal: 112, protein: 4.0, carbs: 22.8, fat: 1.2 },
    { name: '土豆', unit: '100g', kcal: 77, protein: 2.0, carbs: 17.2, fat: 0.1 },
    { name: '南瓜', unit: '100g', kcal: 23, protein: 0.7, carbs: 5.3, fat: 0.1 },
    { name: '番茄', unit: '100g', kcal: 15, protein: 0.9, carbs: 3.3, fat: 0.2 },
    { name: '黄瓜', unit: '100g', kcal: 16, protein: 0.8, carbs: 2.9, fat: 0.2 },
    { name: '菠菜', unit: '100g', kcal: 24, protein: 2.6, carbs: 3.6, fat: 0.3 },
    { name: '生菜', unit: '100g', kcal: 13, protein: 1.3, carbs: 2.0, fat: 0.3 },
    { name: '虾仁', unit: '100g', kcal: 93, protein: 18.6, carbs: 0.8, fat: 0.8 },
    { name: '瘦猪肉', unit: '100g', kcal: 143, protein: 20.3, carbs: 1.5, fat: 6.2 },
    { name: '金枪鱼罐头', unit: '100g', kcal: 131, protein: 29.0, carbs: 0, fat: 1.3 },
    { name: '巴沙鱼', unit: '100g', kcal: 90, protein: 15.0, carbs: 0, fat: 3.0 },
    { name: '豆浆', unit: '250ml', kcal: 54, protein: 4.5, carbs: 2.8, fat: 1.8 },
    { name: '希腊酸奶', unit: '100g', kcal: 97, protein: 9.0, carbs: 3.9, fat: 5.0 },
    { name: '牛油果', unit: '半个', kcal: 160, protein: 2.0, carbs: 8.5, fat: 14.7 },
    { name: '蓝莓', unit: '100g', kcal: 57, protein: 0.7, carbs: 14.5, fat: 0.3 },
    { name: '橙子', unit: '1个', kcal: 62, protein: 1.2, carbs: 15.4, fat: 0.2 },
    { name: '猕猴桃', unit: '1个', kcal: 56, protein: 1.1, carbs: 13.0, fat: 0.5 },
    { name: '荞麦面', unit: '100g', kcal: 340, protein: 11.3, carbs: 71.4, fat: 2.6 },
    { name: '意面(熟)', unit: '100g', kcal: 158, protein: 5.8, carbs: 30.9, fat: 0.9 },
    { name: '馒头', unit: '1个', kcal: 223, protein: 7.0, carbs: 47.0, fat: 1.1 },
    { name: '花生酱', unit: '15g', kcal: 94, protein: 3.8, carbs: 3.0, fat: 7.6 },
  ],

  // 用户自定义食物（原型预置示例；实际由「自定义食物」功能写入）
  customFoods: [
    { name: '自制蛋白奶昔', unit: '1杯(300ml)', kcal: 210, protein: 25.0, carbs: 18.0, fat: 4.0, custom: true },
    { name: '杂粮饭', unit: '100g', kcal: 122, protein: 3.2, carbs: 26.5, fat: 0.5, custom: true },
  ],

  // 训练记录：category 有氧/力量/功能性；rpe 1-10 用力程度量表
  workouts: [
    { id: 'w1', date: '2026-11-15', category: 'strength', name: '平板卧推', sets: 4, reps: 10, weightKg: 60, rpe: 7, kcal: 356, duration: 55, source: 'manual' },
    { id: 'w2', date: '2026-11-13', category: 'strength', name: '硬拉', sets: 4, reps: 8, weightKg: 100, rpe: 8, kcal: 412, duration: 60, source: 'template' },
    { id: 'w3', date: '2026-11-11', category: 'strength', name: '深蹲', sets: 5, reps: 5, weightKg: 90, rpe: 9, kcal: 480, duration: 65, source: 'manual' },
    { id: 'w4', date: '2026-11-09', category: 'functional', name: '壶铃摇摆', sets: 4, reps: 15, weightKg: 16, rpe: 6, kcal: 300, duration: 45, source: 'template' },
    { id: 'w5', date: '2026-11-07', category: 'cardio', name: '跑步', sets: 1, reps: 40, weightKg: null, rpe: 5, kcal: 380, duration: 40, source: 'quick' },
    { id: 'w6', date: '2026-11-05', category: 'strength', name: '坐姿推肩', sets: 4, reps: 12, weightKg: 30, rpe: 6, kcal: 365, duration: 55, source: 'manual' },
    { id: 'w7', date: '2026-11-03', category: 'functional', name: '波比跳', sets: 5, reps: 12, weightKg: null, rpe: 9, kcal: 420, duration: 60, source: 'manual' },
    { id: 'w8', date: '2026-11-01', category: 'cardio', name: '跳绳', sets: 1, reps: 30, weightKg: null, rpe: 6, kcal: 450, duration: 30, source: 'quick' },
    { id: 'w9', date: '2026-10-29', category: 'cardio', name: '椭圆机', sets: 1, reps: 50, weightKg: null, rpe: 4, kcal: 340, duration: 50, source: 'quick' },
    { id: 'w10', date: '2026-10-27', category: 'functional', name: '战绳', sets: 6, reps: 30, weightKg: null, rpe: 8, kcal: 295, duration: 45, source: 'manual' },
  ],

  // 饮食记录：mealType 六餐次（早/午/晚/上午加餐/下午加餐/晚上加餐）
  meals: [
    { id: 'm1', date: '2026-11-15', mealType: '早餐', foods: [
      { name: '燕麦', amount: '50g', kcal: 184, protein: 5.4, carbs: 33.0, fat: 3.4 },
      { name: '牛奶', amount: '250ml', kcal: 135, protein: 8.0, carbs: 12.0, fat: 7.0 },
      { name: '香蕉', amount: '1根', kcal: 89, protein: 1.1, carbs: 22.8, fat: 0.3 },
    ], totalKcal: 408 },
    { id: 'm2', date: '2026-11-15', mealType: '午餐', foods: [
      { name: '米饭', amount: '200g', kcal: 232, protein: 5.2, carbs: 51.8, fat: 0.6 },
      { name: '鸡胸肉', amount: '150g', kcal: 200, protein: 36.9, carbs: 0.6, fat: 5.0 },
      { name: '西兰花', amount: '100g', kcal: 34, protein: 2.8, carbs: 6.6, fat: 0.4 },
    ], totalKcal: 466 },
    { id: 'm3', date: '2026-11-15', mealType: '晚餐', foods: [
      { name: '牛肉', amount: '120g', kcal: 300, protein: 31.2, carbs: 0, fat: 18.0 },
      { name: '红薯', amount: '150g', kcal: 129, protein: 2.4, carbs: 30.2, fat: 0.2 },
    ], totalKcal: 429 },
    { id: 'm4', date: '2026-11-14', mealType: '早餐', foods: [
      { name: '全麦面包', amount: '2片', kcal: 138, protein: 6.2, carbs: 24.8, fat: 2.4 },
      { name: '鸡蛋', amount: '2个', kcal: 144, protein: 12.6, carbs: 1.2, fat: 10.0 },
    ], totalKcal: 282 },
    { id: 'm5', date: '2026-11-14', mealType: '午餐', foods: [
      { name: '三文鱼', amount: '120g', kcal: 250, protein: 24.0, carbs: 0, fat: 15.6 },
      { name: '米饭', amount: '150g', kcal: 174, protein: 3.9, carbs: 38.9, fat: 0.5 },
    ], totalKcal: 424 },
    { id: 'm6', date: '2026-11-14', mealType: '晚餐', foods: [
      { name: '豆腐', amount: '200g', kcal: 152, protein: 16.2, carbs: 3.8, fat: 9.6 },
      { name: '西兰花', amount: '150g', kcal: 51, protein: 4.2, carbs: 9.9, fat: 0.6 },
    ], totalKcal: 203 },
    { id: 'm7', date: '2026-11-14', mealType: '下午加餐', foods: [
      { name: '酸奶', amount: '150g', kcal: 108, protein: 3.8, carbs: 14.0, fat: 4.1 },
      { name: '苹果', amount: '1个', kcal: 52, protein: 0.3, carbs: 13.8, fat: 0.2 },
    ], totalKcal: 160 },
    { id: 'm8', date: '2026-11-14', mealType: '晚上加餐', foods: [
      { name: '混合坚果', amount: '25g', kcal: 150, protein: 4.0, carbs: 6.0, fat: 13.0 },
    ], totalKcal: 150 },
    { id: 'm9', date: '2026-11-13', mealType: '早餐', foods: [
      { name: '燕麦', amount: '50g', kcal: 184, protein: 5.4, carbs: 33.0, fat: 3.4 },
      { name: '鸡蛋', amount: '1个', kcal: 72, protein: 6.3, carbs: 0.6, fat: 5.0 },
    ], totalKcal: 256 },
    { id: 'm10', date: '2026-11-13', mealType: '午餐', foods: [
      { name: '鸡腿', amount: '150g', kcal: 272, protein: 27.0, carbs: 0, fat: 18.0 },
      { name: '米饭', amount: '150g', kcal: 174, protein: 3.9, carbs: 38.9, fat: 0.5 },
    ], totalKcal: 446 },
    { id: 'm11', date: '2026-11-13', mealType: '上午加餐', foods: [
      { name: '香蕉', amount: '1根', kcal: 89, protein: 1.1, carbs: 22.8, fat: 0.3 },
    ], totalKcal: 89 },
  ],

  weights: [
    { id: 'wt1', date: '2026-08-02', weight: 78.2, bodyFat: 23.1 },
    { id: 'wt2', date: '2026-08-10', weight: 77.9, bodyFat: 22.9 },
    { id: 'wt3', date: '2026-08-17', weight: 77.6, bodyFat: 22.8 },
    { id: 'wt4', date: '2026-08-24', weight: 77.8, bodyFat: 22.7 },
    { id: 'wt5', date: '2026-08-31', weight: 77.1, bodyFat: 22.5 },
    { id: 'wt6', date: '2026-09-07', weight: 76.9, bodyFat: 22.4 },
    { id: 'wt7', date: '2026-09-14', weight: 76.5, bodyFat: 22.2 },
    { id: 'wt8', date: '2026-09-21', weight: 76.8, bodyFat: 22.3 },
    { id: 'wt9', date: '2026-09-28', weight: 76.1, bodyFat: 22.0 },
    { id: 'wt10', date: '2026-10-05', weight: 75.8, bodyFat: 21.8 },
    { id: 'wt11', date: '2026-10-12', weight: 75.4, bodyFat: 21.7 },
    { id: 'wt12', date: '2026-10-19', weight: 75.6, bodyFat: 21.6 },
    { id: 'wt13', date: '2026-10-26', weight: 74.9, bodyFat: 21.4 },
    { id: 'wt14', date: '2026-11-02', weight: 74.5, bodyFat: 21.2 },
    { id: 'wt15', date: '2026-11-05', weight: 74.3, bodyFat: 21.1 },
    { id: 'wt16', date: '2026-11-08', weight: 74.0, bodyFat: 20.9 },
    { id: 'wt17', date: '2026-11-11', weight: 73.6, bodyFat: 20.7 },
    { id: 'wt18', date: '2026-11-14', weight: 73.2, bodyFat: 20.5 },
  ],
};
