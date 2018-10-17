# editor 模块
 
0.0.1

## 一、editor 组织结构

一篇文章考虑由多个原子操作 step 和过程 process 串联而成。

### 2.1 文章结构

文章包括了文章的元信息：标题、作者、日期、关键词、引用等。还以此添加了所有的 step 和 process。
文章中的 step 和 process 标签与组件的 step 、 process 描述方法并不相同。只包括 所有输入框的名字和值。以及附加的描述、图片、列表等。

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<article>
    <title>标题名字</title>
    <date>提交时间<date>

    <!-- 主要作者 -->
    <author type="primary">作者名字1</author> 
    <!-- 其他作者 -->
    <author >作者名字2</author> 
    <!-- ... -->

    <!-- 关键词 -->
    <key>关键词1</key>
    <key>关键词2</key>
    <key>关键词3</key>

    <!-- 引用 -->
    <quote type="eassy">引用1</quote>
    <quote type="magazine">引用2</quote>
    <quote type="network">引用3</quote>
    <!-- ... -->
    <step id="stepid1">
        <field lable="标签名1">值</field>
        <field lable="标签名2">值</field>
        <field lable="标签名3">值</field>
        <!-- 剩下的部分是文字、图片、引用等补充部分 -->
        <remark>remark部分</remark>
        <description>description部分</description>
        <pic id="id"  name="name" src="url"/>
        <quote type="...">引用</quote>
    </step>

    <step id="stepid2">
        <field lable="标签名4">值</field>
        <field lable="标签名5">值</field>
        <field lable="标签名6">值</field>
        <!-- 剩下的部分是文字、图片、引用等补充部分 -->
        <remark>remark部分</remark>
        <description>description部分</description>
        <pic id="id"  name="name" src="url"/>
        <quote type="...">引用</quote>
    </step>


    <process id="processid">

        <field lable="标签名7">值</field>
        <field lable="标签名8">值</field>

        <step id="stepid3">
            <field lable="标签名9">值</field>
            <field lable="标签名10">值</field>
            <field lable="标签名11">值</field>
        </step>
    `q      1```````````````````````````````````    `1`                                                                                 `1
        <step id="stepid4">
            <field lable="标签名12">值</field>
            <field lable="标签名13">值</field>
            <field lable="标签名14">值</field>
        </step>
        <!-- 剩下的部分是文字、图片、引用等补充部分 -->
        <remark>remark部分</remark>
        <description>description部分</description>
        <pic id="id"  name="name" src="url"/>
        <quote type="...">引用</quote>
    <step>

        <!-- 剩下的部分是文字、图片、引用等补充部分 -->
        <remark>remark部分</remark>
        <description>description部分</description>
        <pic id="id"  name="name" src="url"/>
        <quote type="...">引用</quote>
    <step>
    <process>

</article>
```

### 2.2 step 定义

其中原子操作的中有的表单拥有 input、testarea、select、checkbox、radio等选项。
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<step id="stepid" name="原子操作名">
    <!-- input -->
    <input label="名字" default="默认值"/>

    <!-- textarea -->
    <textarea label="名字" default="默认值"/>

    <!-- select -->
    <select label="名字" default='1'>
        <option value="选项1">选项1</option>
        <option value="选项2">选项2</option>
        <option value="选项3">选项3</option>
        <option value="选项4">选项4</option>
    </select>

    <!-- radio -->
    <radio label="名字" default="checked"/>

    <!-- checkbox -->
    <checkbox label="名字" default='1'>
        <option >值1</option>
        <option >值2</option>
        <option >值3</option>
        <!-- ... -->
    </checkbox>

</step>
```
### 2.3 step-set 定义

当需要传递一系列 step 的时候，通过 step-set 标签包裹每一个 step。

``` xml
<step-set>
    <step>
        <!-- step1 detail -->
    </step>
    <step>
        <!-- step2 detail -->
    </step>
    <!-- ... -->
</step-set>
```

### 2.4 process 定义

过程 Process 中包含了多个step，也有自己的 remark、description、pic、quote标签。如下显示。

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<process id="stepid" name="原子操作名">
    <!-- input -->
    <input label="名字" value="值" default="默认值"/>

    <!-- textarea -->
    <textarea label="名字" value="值" default="默认值"/>

    <!-- select -->
    <select label="名字" default='1'>
        <option value="选项1">选项1</option>
        <option value="选项2">选项2</option>
        <option value="选项3">选项3</option>
        <option value="选项4">选项4</option>
    </select>

    <!-- radio -->
    <radio label="名字" default="checked" value="值"/>

    <!-- checkbox -->
    <checkbox label="名字" default='1'>
        <option >值1</option>
        <option >值2</option>
        <option >值3</option>
        <!-- ... -->
    </checkbox>

    <step>
        <!-- ... -->
    </step>

    <step>
        <!-- ... -->
    </step>

</process>
```

### 2.5 process-set 定义

当需要传递 一系列 process 的时候，通过 process-set 标签包裹每一个 process。

``` xml
<process-set>
    <process>
        <!-- process1 detail -->
    </process>
    <process>
        <!-- process2 detail -->
    </process>
    <!-- ... -->
</process-set>
```

## 界面 UI 设计

## 默认提供的 step 和 process 模块

