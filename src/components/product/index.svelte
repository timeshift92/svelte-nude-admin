<Crud {data} />

<script>
  import Crud from '../Base/CRUD/index.svelte'
  import { query } from 'api.js'
  import Custom from './Custom.svelte'
  import DatePickerFilter from './DatePickerFilter.svelte'
  import Slider from 'co/Base/slider'
  const data = {
    queryName: 'products',
    pagination: {
      limit: 15,
    },
    create: true,
    actions: {
      title: 'Действия',
      update: true,
      delete: true,
    },
    columns: [
      {
        name: 'id',
        title: 'Ид',
        sort: is_desc => ({
          id: is_desc ? 'desc' : 'asc',
        }),
        value: model => model.id,
        filter: {
          query: value => ({
            product_locales: {
              name: { _ilike: `%${value}%` },
            },
          }),
          placeholder: 'Название',
        },
      },
      { name: 'rest', title: 'Остаток', component: Custom },
      { name: 'created_at', title: 'Создана', filter: { component: DatePickerFilter } },
      {
        name: 'product_colors',
        fields: ['color_id'],
        value: row => {
          let val = ''
          for (let index = 0; index < row.product_colors.length; index++) {
            val += ' ' + row.product_colors[index].color_id
          }
          return val
        },
        title: 'Ид цвета',
      },
      { name: 'product_locales', fields: ['name', 'description'], value: row => row.product_locales[0].name, title: 'Название' },
      {
        name: 'product_images',
        component: Slider,
        props: row => ({
          images: [...row.product_images],
        }),
        fields: ['name', 'extension', 'image', 'alt', 'id', 'is_main'],
        title: 'Изображение',
      },
    ],

componentProps: [
      {
        type: 'relation',
        title: 'Локализация',
        name: 'product_locales',
        tabs: {
          count: 2,
          labels: ['ru', 'uz'],
          args: [{ name: 'locales_id', value: 1 }, {name: 'locales_id', value:  2 }],
        },
        fields: [
          {
            type: 'text',
            name: 'description',
            label: 'Описание',
            placeholder: 'Описание',
          },
          {
            type: 'text',
            name: 'name',
            label: 'Название',
            placeholder: 'Название',
          },
        ],
      },

      {
        group: 'text',
        type: 'text',
        name: 'article',
        label: 'Артикул | модель',
        placeholder: 'Артикул',
      },
      {
        type: 'number',
        name: 'price',
        label: 'Цена',
        placeholder: 'Цена',
      },
      {
        type: 'number',
        name: 'old_price',
        label: 'Старая цена',
        placeholder: 'Старая цена',
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
        type: 'dropdown',
        name: 'brand_id',
        label: 'Бренд',
        placeholder: 'Выберите бренд',
        data: {
          preload: type => query('BRANDS'),
          name: 'BRANDS',
        },
      },
      {
        type: 'dropdown',
        name: 'product_colors',
        multiple: true,
        label: 'Цвет',
        placeholder: 'Выберите Цвет',
        data: {
          preload: type => query('COLORS'),
          fieldName: 'color_locales.name',
          foreign_key: 'color_id',
          name: 'COLORS',
        },
      },
      {
        type: 'dropdown',
        options: {
          stage: true,
        },
        name: 'categories_products',
        label: 'Категория',
        placeholder: 'Выберите категория',
        data: {
          preload: type => query('CATEGORIES'),
          fieldName: 'category_locales.name',
          foreign_key: 'category_id',
          name: 'CATEGORIES',
        },
      },
      {
				column: 'span 3',
				options: {
          stage: true,
        },
        type: 'image',
        name: 'product_images',
        multiple: true,
        fields: ['name', 'extension', 'image', 'alt', 'id', 'is_main'],
        label: 'Изображение',
        placeholder: 'Изображение',
      },
    ],
  }
</script>
