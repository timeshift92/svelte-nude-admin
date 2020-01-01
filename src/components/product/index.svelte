<Crud {data} />

<script>
  import Crud from '../Base/CRUD/index.svelte'
  import { query } from 'api.js'

  const data = {
    queryName: 'PRODUCTS',
    limit: 15,
    columns: [
      { name: 'id',  title: 'Ид' },
      { name: 'rest', title: 'Остаток' },
      { name: 'product_locales', title: 'Название' },
    ],
    componentProps: [
      {
        type: 'text',
        name: 'name',
        path: 'product_locales',
        label: 'Название',
        placeholder: 'Название',
      },

      {
        type: 'text',
        name: 'description',
        path: 'product_locales',
        label: 'Описание',
        placeholder: 'Описание',
      },
      {
        type: 'number',
        name: 'price',
        label: 'Цена',
        placeholder: 'Цена',
      },
      {
        type: 'text',
        name: 'article',
        label: 'Артикул | модель',
        placeholder: 'Артикул',
      },
      {
        type: 'number',
        name: 'old_price',
        label: 'Старая цена',
        placeholder: 'Старая цена',
      },
      {
        type: 'select',
        name: 'brand_id',
        label: 'Бренд',
        placeholder: 'Выберите бренд',
        data: {
          preload: type => query('BRANDS'),
          name: 'BRANDS',
        },
      },
      {
        type: 'select',
        name: 'color_id',
        path: 'product_colors',
        multiple: true,
        label: 'Цвет',
        placeholder: 'Выберите Цвет',
        data: {
          preload: type => query('COLORS'),
          fieldName: 'color_locales.name',
          filter: 'color_id',
          name: 'COLORS',
        },
      },
      {
        type: 'select',
        name: 'category_id',
        path: 'categories_products',
        label: 'Категория',
        placeholder: 'Выберите категория',
        data: {
          preload: type => query('CATEGORIES'),
          fieldName: 'category_locales.name',

          name: 'CATEGORIES',
        },
      },

      {
        type: 'number',
        name: 'discount',
        value: 0,
        label: 'Скидка',
        placeholder: 'Скидка',
      },
      {
        type: 'number',
        name: 'charge',
        min: 1,
        value: 1,
        label: 'Наценка',
        placeholder: 'Наценка',
      },
      {
        type: 'number',
        name: 'rest',

        value: 5,
        label: 'Остаток',
        placeholder: 'Остаток',
      },
      {
        type: 'file',
        name: 'images',
        label: 'Изображение',
        placeholder: 'Изображение',
      },
    ],
  }
</script>
