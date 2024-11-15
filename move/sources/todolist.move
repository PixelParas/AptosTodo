module todolist_addr::todolist {

  use aptos_framework::account;
  use std::signer;
  use aptos_framework::event;
  use std::string::String;
  use aptos_std::table::{Self, Table};
  #[test_only]
  use std::string;

  // Errors
  const E_NOT_INITIALIZED: u64 = 1;
  const ETASK_DOESNT_EXIST: u64 = 2;
  const ETASK_IS_COMPLETED: u64 = 3;

  
  struct UserInfo has key{
      user_name: String,
      user_avatar: String,
      account_balance: u64,
      weekly_limit: u64,
      incomings: u64,
      outgoings: u64
  }
  struct TransactionList has key{
    transactions: Table<u64, Transaction>,
    set_transaciton_event: event::EventHandle<Transaction>,
    transaction_counter: u64
  }
  struct Transaction has store, drop, copy {
    transaction_id: u64,
    transaction_address: address,
    product_name: String,
    product_image: String,
    time: String,
    cutomer_name:String,
    date: String,
    amount: u64,
    payment_method: String,
    status: String
  }

  struct TodoList has key {
    tasks: Table<u64, Task>,
    set_task_event: event::EventHandle<Task>,
    task_counter: u64
  }

  struct Task has store, drop, copy {
    task_id: u64,
    address:address,
    content: String,
    completed: bool,
  }

  public entry fun create_userInfo(account: &signer, user_name: String, user_avatar: String, account_balance: u64, weekly_limit: u64, incomings:u64,outgoings:u64){
    let user_info = UserInfo{
      user_name,
      user_avatar,
      account_balance,
      weekly_limit,
      incomings,
      outgoings,
    };
    move_to(account, user_info);
  }
  public entry fun create_transactionlist(account: &signer){
    let transaction_list = TransactionList {
      transactions: table::new(),
      set_transaciton_event: account::new_event_handle<Transaction>(account),
      transaction_counter: 0
    };
    // move the TodoList resource under the signer account
    move_to(account, transaction_list);
  }

  public entry fun create_list(account: &signer){
    let todo_list = TodoList {
      tasks: table::new(),
      set_task_event: account::new_event_handle<Task>(account),
      task_counter: 0
    };
    // move the TodoList resource under the signer account
    move_to(account, todo_list);
  }

  public entry fun create_task(account: &signer, content: String) acquires TodoList {
    // gets the signer address
    let signer_address = signer::address_of(account);
    // assert signer has created a list
    assert!(exists<TodoList>(signer_address), E_NOT_INITIALIZED);
    // gets the TodoList resource
    let todo_list = borrow_global_mut<TodoList>(signer_address);
    // increment task counter
    let counter = todo_list.task_counter + 1;
    // creates a new Task
    let new_task = Task {
      task_id: counter,
      address: signer_address,
      content,
      completed: false
    };
    // adds the new task into the tasks table
    table::upsert(&mut todo_list.tasks, counter, new_task);
    // sets the task counter to be the incremented counter
    todo_list.task_counter = counter;
    // fires a new task created event
    event::emit_event<Task>(
      &mut borrow_global_mut<TodoList>(signer_address).set_task_event,
      new_task,
    );
  }
  public entry fun create_transaction(account: &signer, 
    product_name: String, 
    product_image: String, 
    time:String,    
    cutomer_name:String,
    date: String,
    amount: u64,
    payment_method: String,
    status: String) acquires TransactionList {
    // gets the signer address
    let signer_address = signer::address_of(account);
    // assert signer has created a list
    assert!(exists<TransactionList>(signer_address), E_NOT_INITIALIZED);
    // gets the TodoList resource
    let transaction_list = borrow_global_mut<TransactionList>(signer_address);
    // increment task counter
    let counter = transaction_list.transaction_counter + 1;
    // creates a new Task
    let new_transaction = Transaction {
      transaction_id: counter,
      transaction_address: signer_address,
      product_name,
      product_image,
      time,
      cutomer_name,
      date,
      amount,
      payment_method,
      status
    };
    // adds the new task into the tasks table
    table::upsert(&mut transaction_list.transactions, counter, new_transaction);
    // sets the task counter to be the incremented counter
    transaction_list.transaction_counter = counter;
    // fires a new task created event
    event::emit_event<Transaction>(
      &mut borrow_global_mut<TransactionList>(signer_address).set_transaciton_event,
      new_transaction,
    );
  }

  public entry fun complete_task(account: &signer, task_id: u64) acquires TodoList {
    // gets the signer address
    let signer_address = signer::address_of(account);
		// assert signer has created a list
    assert!(exists<TodoList>(signer_address), E_NOT_INITIALIZED);
    // gets the TodoList resource
    let todo_list = borrow_global_mut<TodoList>(signer_address);
    // assert task exists
    assert!(table::contains(&todo_list.tasks, task_id), ETASK_DOESNT_EXIST);
    // gets the task matched the task_id
    let task_record = table::borrow_mut(&mut todo_list.tasks, task_id);
    // assert task is not completed
    assert!(task_record.completed == false, ETASK_IS_COMPLETED);
    // update task as completed
    task_record.completed = true;
  }

  #[test(admin = @0x123)]
  public entry fun test_flow(admin: signer) acquires TodoList {
    // creates an admin @todolist_addr account for test
    account::create_account_for_test(signer::address_of(&admin));
    // initialize contract with admin account 
    create_list(&admin);

    // creates a task by the admin account
    create_task(&admin, string::utf8(b"New Task"));
    let task_count = event::counter(&borrow_global<TodoList>(signer::address_of(&admin)).set_task_event);
    assert!(task_count == 1, 4);
    let todo_list = borrow_global<TodoList>(signer::address_of(&admin));
    assert!(todo_list.task_counter == 1, 5);
    let task_record = table::borrow(&todo_list.tasks, todo_list.task_counter);
    assert!(task_record.task_id == 1, 6);
    assert!(task_record.completed == false, 7);
    assert!(task_record.content == string::utf8(b"New Task"), 8);
    assert!(task_record.address == signer::address_of(&admin), 9);

    // updates task as completed
    complete_task(&admin, 1);
    let todo_list = borrow_global<TodoList>(signer::address_of(&admin));
    let task_record = table::borrow(&todo_list.tasks, 1);
    assert!(task_record.task_id == 1, 10);
    assert!(task_record.completed == true, 11);
    assert!(task_record.content == string::utf8(b"New Task"), 12);
    assert!(task_record.address == signer::address_of(&admin), 13);
  }

  #[test(admin = @0x123)]
  #[expected_failure(abort_code = E_NOT_INITIALIZED)]
  public entry fun account_can_not_update_task(admin: signer) acquires TodoList {
    // creates an admin @todolist_addr account for test
    account::create_account_for_test(signer::address_of(&admin));
    // account can not toggle task as no list was created
    complete_task(&admin, 2);
  }

}
