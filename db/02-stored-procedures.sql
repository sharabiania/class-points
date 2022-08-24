USE class_points_dev;
--
-- Dumping routines for database 'class_points'
--

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `leaderboard`(
  in cohort_id int
)
BEGIN
select 
students.name,
sum(point_types.point_value)
from students 
join transactions on students.st_id = transactions.st_id
join point_types on transactions.ty_id = point_types.ty_id
where students.c_id=cohort_id
group by students.st_id
order by sum(point_types.point_value) desc;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `transaction_history`(
  in page_size INT,
  in off_set INT
)
BEGIN
	select 
		students.name, 		
        point_types.point_value,
        point_types.name as point_type,
        time_stamp,
        note
	from transactions
    inner join point_types on transactions.ty_id = point_types.ty_id
	inner join students on transactions.st_id =students.st_id
	order by time_stamp desc
  limit page_size offset off_set;
END ;;
DELIMITER ;

