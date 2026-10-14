# Flutter 讲堂

一位老师把 Flutter 从语言讲到发布。屏幕上是知识点总结，老师另有一套口语，带语调、多音字和函数名读法。没有测验。

## 打开

```bash
pip install -r requirements.txt
node scripts/build-course.mjs
python3 scripts/serve.py
```

浏览器打开 http://127.0.0.1:4173 。

点播放。老师把这一节连续讲完，中间不切句。上一节、下一节用来换课。速度可以在 0.75 倍到 2 倍之间调，不会重新合成。进度记在浏览器里。

## 一节课里有什么

`course/lessons/` 里每节分三块：

- 总结：给你看的条目和代码
- 口播：老师真正说的话
- 语调：每句标注平稳、放慢、加重、问句或收束，以及句后停顿

函数名写在反引号里。`setState` 会读成 set state，不会逐个字母拼。

读音表在 `course/pronunciation/`。口播里没有标音的常见多音字会让构建失败。
