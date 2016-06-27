<todo>

  <h3>{ opts.title }</h3>

  <ul>
    <li each={ items }>
      <label class={ completed: done }>
        <input type="checkbox" checked={ done } onclick={ parent.toggle }> { title }
      </label>
    </li>
  </ul>

  <form onsubmit={ add }>
    <input name="input" onkeyup={ edit }>
    <button disabled={ !text }>Add #{ items.length + 1 }</button>
  </form>

<script>
  	var self= this;
    self.items = opts.items || [];


    edit(e) {
      self.text = e.target.value
    }

    add(e) {
    	e.preventDefault();
      if (self.text) {
        self.items.push({ title: self.text })
        self.text = self.input.value = ''
      }
    }

    toggle(e) {
      var item = e.item
      item.done = !item.done
      return true
    }
</script>

</todo>