function Employee(name,salary){
this.name=name;
this.salary=this.salary;
this.checkBox=function(){
  if(this.salary<50000)
    console.log("`tax not applicable for ${this.name}");
  else if(this.salary>=50000 && this.salary<100000)
    console.log(`Tax applicable for ${this.name} at 20%`);
  else  
    console.log(`Tax applicable for ${this.name} at 30%`);
}
}
const emp1=new Employee("Khushi",100000);
const emp2=new Employee("Khushi2",50000);
const emp3=new Employee("khushi3",70000);
emp1.checkBox();
emp2.checkBox();