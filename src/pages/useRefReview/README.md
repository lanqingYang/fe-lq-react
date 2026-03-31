# useRef 核心

1. 两个用途：绑定DOM ；存不渲染的变量
2. 修改ref 不触发重新渲染
3. 适合存：定时器id、请求标记、DOM、上一轮值
4. 和state区别： state驱动视图（值修改触发重新渲染）， ref只存数据，改变不渲染视图
5. 通过 xxRef.current
