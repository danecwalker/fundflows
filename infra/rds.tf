resource "aws_db_instance" "pg" {
  identifier = "fundflows-db"
  allocated_storage = 0.5
  storage_type = "gp2"
  engine = "postgres"
  instance_class = "db.t4g.micro"
  username = "foo"
  password = "bar"
}