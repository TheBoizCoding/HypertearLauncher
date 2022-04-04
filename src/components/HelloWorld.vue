<script lang="ts">
import { defineComponent } from 'vue';
  
export default defineComponent({
    name: 'HelloWorld',
    props: {
        msg: String,
    },
});
</script>

<template>
  <h1>H1 - Hello World</h1>
  <h2>H2 - Hello World</h2>
  <h3>H3 - Hello World</h3>
  <h4>H4 - Hello World</h4>
  <a href="">Some Anchor Element A</a>
  <a href="" class="secondary">Some Anchor Element</a>

  <p>Some Paragraph with Lorem inside<br>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eos fugiat distinctio facilis error quibusdam eaque ipsa laboriosam necessitatibus. Molestias accusamus qui incidunt nostrum veritatis fuga architecto molestiae voluptate doloremque!</p>
  

  <br>
  <input type="time" name="Hello Time" id="">
  <input type="week" name="Hello Week" id="">
  <input type="date" name="Hello Date" id="">
  <br>
  <input type="checkbox" name="Hello Checkbox" id="">
  <input type="radio" name="Hello Radio Input" id="">
  <br>
  <input type="text" name="Hello Text" placeholder="Hello Text" id="">
  <input type="password" name="Hello Password" placeholder="Hello Password" id="">
  <input type="search" name="Hello Search" placeholder="Hello Search" id="">
  <br>
  <input type="reset" value="Hello Reset">
  <input type="submit" value="Hello Submit">
  <br>
  <input type="color" value="#00ff80" name="Hello Color" id="">
  <br>
  <br>

  <button class="primary">primary button</button>
  <button class="secondary">secondary button</button>
  <button class="sucess">sucess button</button>
  <button class="warn">warn button</button>
  <button class="error">error button</button>
  <br>
  <button class="primary">primary button <br> bigger</button>
  <br>
  <table>
    <thead>
      <tr>
        <th>Lorem ipsum dolor sit amet.</th>
        <th>Quas aspernatur aliquam aliquid corporis.</th>
        <th>Vero asperiores voluptatum hic temporibus.</th>
        <th>Necessitatibus tenetur quo voluptates ea.</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Fugit eum nobis modi obcaecati?</td>
        <td>Obcaecati consequuntur molestias consequatur nisi.</td>
        <td>Odio consequuntur perferendis doloribus consectetur?</td>
      </tr>
      <tr>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Architecto natus possimus in culpa.</td>
        <td>Dolores reiciendis illo blanditiis modi.</td>
        <td>Sint facere possimus amet at.</td>
      </tr>
      <tr>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Impedit hic nemo et numquam.</td>
        <td>At assumenda a porro explicabo.</td>
        <td>Similique saepe iusto atque laboriosam!</td>
      </tr>
      <tr>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Quibusdam soluta voluptas expedita facere.</td>
        <td>Facilis expedita architecto quis velit?</td>
        <td>Maxime ab nostrum magni cum.</td>
      </tr>
    </tbody>
  </table>

</template>