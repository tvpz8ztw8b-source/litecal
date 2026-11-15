// api.js —— API 桩层：签名即未来微信云开发的真实调用
// 约定：每个函数标注「HTTP/云开发方法 + 集合/路径 + 入参/出参」，后续机械替换为 wx.cloud 即可。
const apiDelay = (ms = 320) => new Promise(r => setTimeout(r, ms));

// 云开发集合映射：
//   workouts  -> 集合 'workouts'
//   meals     -> 集合 'meals'
//   weights   -> 集合 'weights'
//   foodLib   -> 集合 'foods'（预设食物库，可云端扩展）
//   profile   -> 集合 'profiles'（按 openid 隔离）
const API = {
  // POST 新增训练记录  -> 集合 'workouts'.add({ data })
  async addWorkout(rec) {
    await apiDelay(260);
    DB.workouts.unshift(rec);
    return { code: 0, data: rec };
  },

  // DELETE 删除训练记录  -> 集合 'workouts'.doc(id).remove()
  async deleteWorkout(id) {
    await apiDelay(200);
    DB.workouts = DB.workouts.filter(w => w.id !== id);
    return { code: 0 };
  },

  // PUT 更新训练记录  -> 集合 'workouts'.doc(id).update({ data })
  async updateWorkout(id, rec) {
    await apiDelay(200);
    DB.workouts = DB.workouts.map(w => w.id === id ? { ...w, ...rec, id } : w);
    return { code: 0, data: rec };
  },

  // POST 新增自定义食物  -> 集合 'foods'.add({ data })
  async addCustomFood(rec) {
    await apiDelay();
    // TODO: wx.cloud.callFunction({ name: 'addFood', data: rec })
    DB.customFoods.push(rec);
    return { code: 0, data: rec };
  },

  // POST 新增饮食记录  -> 集合 'meals'.add({ data })
  async addMeal(rec) {
    await apiDelay(260);
    DB.meals.unshift(rec);
    return { code: 0, data: rec };
  },

  // DELETE 删除饮食记录  -> 集合 'meals'.doc(id).remove()
  async deleteMeal(id) {
    await apiDelay(200);
    DB.meals = DB.meals.filter(m => m.id !== id);
    return { code: 0 };
  },

  // PUT 更新饮食记录  -> 集合 'meals'.doc(id).update({ data })
  async updateMeal(id, rec) {
    await apiDelay(200);
    DB.meals = DB.meals.map(m => m.id === id ? { ...m, ...rec, id } : m);
    return { code: 0, data: rec };
  },

  // POST 新增体重记录  -> 集合 'weights'.add({ data })
  async addWeight(rec) {
    await apiDelay(260);
    DB.weights.push(rec);
    DB.weights.sort((a, b) => a.date.localeCompare(b.date));
    return { code: 0, data: rec };
  },

  // DELETE 删除体重记录  -> 集合 'weights'.doc(id).remove()
  async deleteWeight(id) {
    await apiDelay(200);
    DB.weights = DB.weights.filter(w => w.id !== id);
    return { code: 0 };
  },

  // PUT 更新体重记录  -> 集合 'weights'.doc(id).update({ data })
  async updateWeight(id, patch) {
    await apiDelay(200);
    DB.weights = DB.weights.map(w => w.id === id ? { ...w, ...patch, id } : w);
    DB.weights.sort((a, b) => a.date.localeCompare(b.date));
    return { code: 0 };
  },

  // PUT 更新目标  -> 集合 'profiles'.doc(id).update({ data })
  async updateProfile(patch) {
    await apiDelay(260);
    Object.assign(DB.profile, patch);
    return { code: 0, data: DB.profile };
  },
};
