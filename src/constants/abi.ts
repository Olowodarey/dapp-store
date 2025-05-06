export const TODO_ABI = [
  {
    type: "impl",
    name: "store",
    interface_name: "superstore::Istore::Istore",
  },
  {
    type: "struct",
    name: "superstore::store::Store::Items",
    members: [
      {
        name: "productname",
        type: "core::felt252",
      },
      {
        name: "price",
        type: "core::integer::u8",
      },
      {
        name: "quantity",
        type: "core::integer::u8",
      },
    ],
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    type: "interface",
    name: "superstore::Istore::Istore",
    items: [
      {
        type: "function",
        name: "add_item",
        inputs: [
          {
            name: "productname",
            type: "core::felt252",
          },
          {
            name: "price",
            type: "core::integer::u8",
          },
          {
            name: "quantity",
            type: "core::integer::u8",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_item",
        inputs: [
          {
            name: "productname",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "superstore::store::Store::Items",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_total_items",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "purchase_item",
        inputs: [
          {
            name: "productname",
            type: "core::felt252",
          },
          {
            name: "quantity",
            type: "core::integer::u8",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "add_discount",
        inputs: [
          {
            name: "productname",
            type: "core::felt252",
          },
          {
            name: "min_quantity",
            type: "core::integer::u8",
          },
          {
            name: "discount_percentage",
            type: "core::integer::u8",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_discount",
        inputs: [
          {
            name: "productname",
            type: "core::felt252",
          },
          {
            name: "quantity",
            type: "core::integer::u8",
          },
        ],
        outputs: [
          {
            type: "core::integer::u8",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "purchase_with_discount",
        inputs: [
          {
            name: "productname",
            type: "core::felt252",
          },
          {
            name: "quantity",
            type: "core::integer::u8",
          },
        ],
        outputs: [
          {
            type: "(core::bool, core::integer::u8)",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_all_items",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<superstore::store::Store::Items>",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    type: "event",
    name: "superstore::store::Store::Event",
    kind: "enum",
    variants: [],
  },
];
