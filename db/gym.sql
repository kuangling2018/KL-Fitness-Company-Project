set names utf8;/*这句代码经常拉下*/
drop database if exists gym;/*这句代码经常拉下*/
create database gym charset=utf8;
use gym;/*这句代码经常拉下*/

create table gym_user(
id int primary key auto_increment,
name varchar(32) not null,/*教练姓名*/
mailbox varchar(20) not null,
password varchar(20) not null,/*密码：不超过20*/
telephone char(11) unique,
gender char(1) default '1',/*1代表男，0代表女*/
uimg varchar(100) default "images/coach1.jpg"
); 

insert into gym_user values(1,'张无忌','472212029@qq.com','123456','17784450961','1',"images/coach/coach1.jpg");
insert into gym_user values(2,'赵敏','2212029@qq.com','123456','18884450961','0',"images/coach/coach2.jpg");
insert into gym_user values(3,'张翠山','72212029@qq.com','123456','17684450961','1',"images/coach/coach3.jpg");
insert into gym_user values(4,'成昆','7212029@qq.com','123456','17684450962','1',"images/coach/coach4.jpg");
insert into gym_user values(5,'杨逍','7212029@qq.com','123456','17684450963','1',"images/coach/coach5.jpg");
insert into gym_user values(6,'谢逊','721229@qq.com','123456','17684450964','1',"images/coach/coach6.jpg");
insert into gym_user values(7,'周芷若','4712029@qq.com','123456','17784450965','0',"images/coach/coach7.jpg");
insert into gym_user values(8,'殷素素','222312229@qq.com','123456','18884450966','0',"images/coach/coach8.jpg");
insert into gym_user values(9,'范遥','722029@qq.com','123456','17784450963','1',"images/coach/coach9.jpg");
insert into gym_user values(10,'纪晓芙','21312029@qq.com','123456','18184450962','0',"images/coach/coach10.jpg");
insert into gym_user values(11,'殷天正','7221213219@qq.com','123456','17684452962','1',"images/coach/coach11.jpg");
insert into gym_user values(12,'杨不悔','43412029@qq.com','123456','17684450969','0',"images/coach/coach12.jpg");

create table gym_product(
pid int primary key auto_increment,
pname varchar(64) not null,
pdetail varchar(128) not null,
price float(8,2) not null,
pimage varchar(100) not null,
href varchar(128) not null
);

insert into gym_product values(1,'跑步机','SH-T3300 A3家用静音跑步机',5499.00,'images/equip/equip1.jpg','test_detail.html?pid=1');
insert into gym_product values(2,'动感单车','SH-B8860S 高端商用动感单车',8400.00,'images/equip/equip2.jpg','test_detail.html?pid=2');
insert into gym_product values(3,'胸肌训练器','SH-G5827 蝴蝶式胸肌训练器',19920.00,'images/equip/equip3.jpg','test_detail.html?pid=3');
insert into gym_product values(4,'仰卧起坐训练器','SH-G5859 深蹲仰卧起坐辅助训练器',3760.00,'images/equip/equip4.jpg','test_detail.html?pid=4');
insert into gym_product values(5,'单人站综合训练器','SH-G6501 多功能单人站综合训练器',9999.00,'images/equip/equip5.jpg','test_detail.html?pid=5');
insert into gym_product values(6,'台阶机','MATRIX S7xi 乔山台阶机',8988.00,'images/equip/equip6.jpg','test_detail.html?pid=6');
insert into gym_product values(7,'按摩椅','SR-A6L-1 一体式免安装按摩椅',6786.00,'images/equip/equip7.jpg','test_detail.html?pid=7');
insert into gym_product values(8,'健腹板','SH-G5899 大型健腹板',3243.00,'images/equip/equip8.jpg','test_detail.html?pid=8');
insert into gym_product values(9,'平衡板','捷英飞 JB006A-1 木质多向平衡板',4324.00,'images/equip/equip9.jpg','test_detail.html?pid=9');


create table gym_detail(
pid int primary key auto_increment,
pname varchar(64) not null,
ptype varchar(128) not null,
pcolor varchar(64) not null,
pweight varchar(32) not null,
psize varchar(128) not null,
price float(8,2) not null
);

insert into gym_detail values(1,'家用静音跑步机','SH-T3300','正常色','112KG','420*1250mm',5499.00);
insert into gym_detail values(2,'高端商用动感单车','SH-B8860S','红色','20KG','1220*540*1190mm',8400.00);
insert into gym_detail values(3,'蝴蝶式胸肌训练器','SH-G5827','正常色','31KG','127.5*66.5*71cm',19920.00);
insert into gym_detail values(4,'深蹲仰卧起坐辅助训练器','SH-G5859','正常色','31KG','127.5*66.5*71cm',3760.00);
insert into gym_detail values(5,'多功能单人站综合训练器','SH-G6501','正常色','31KG','1720*1050*2050cm',9999.00);
insert into gym_detail values(6,'乔山台阶机','MATRIX S7xi','红色','31KG','127.5*66.5*71cm',8988.00);
insert into gym_detail values(7,'一体式免安装按摩椅','SR-A6L-1','蓝色','31KG','127.5*66.5*71cm',6786.00);
insert into gym_detail values(8,'大型健腹板','SH-G5899','黑色','18KG','1630*370*950mm',3243.00);
insert into gym_detail values(9,'木质多向平衡板','JB006A-1','正常色','31KG','127.5*66.5*71cm',4324.00);


CREATE TABLE gym_pic (
  lid int(11) primary key auto_increment,
  pid int(11) default NULL,
  sm varchar(128) default NULL,
  md varchar(128) default NULL,
  lg varchar(128) default NULL
);
insert into gym_pic values(1,1,'images/equip/equip1/equip1_1_sm.jpg','images/equip/equip1/equip1_1_md.jpg','images/equip/equip1/equip1_1_lg.jpg');
insert into gym_pic values(2,1,'images/equip/equip1/equip1_2_sm.jpg','images/equip/equip1/equip1_2_md.jpg','images/equip/equip1/equip1_2_lg.jpg');
insert into gym_pic values(3,1,'images/equip/equip1/equip1_3_sm.jpg','images/equip/equip1/equip1_3_md.jpg','images/equip/equip1/equip1_3_lg.jpg');
insert into gym_pic values(4,1,'images/equip/equip1/equip1_4_sm.jpg','images/equip/equip1/equip1_4_md.jpg','images/equip/equip1/equip1_4_lg.jpg');

insert into gym_pic values(5,2,'images/equip/equip2/equip2_1_sm.jpg','images/equip/equip2/equip2_1_md.jpg','images/equip/equip2/equip2_1_lg.jpg');
insert into gym_pic values(6,2,'images/equip/equip2/equip2_2_sm.jpg','images/equip/equip2/equip2_2_md.jpg','images/equip/equip2/equip2_2_lg.jpg');
insert into gym_pic values(7,2,'images/equip/equip2/equip2_3_sm.jpg','images/equip/equip2/equip2_3_md.jpg','images/equip/equip2/equip2_3_lg.jpg');
insert into gym_pic values(8,2,'images/equip/equip2/equip2_4_sm.jpg','images/equip/equip2/equip2_4_md.jpg','images/equip/equip2/equip2_4_lg.jpg');

insert into gym_pic values(9,3,'images/equip/equip3/equip3_1_sm.jpg','images/equip/equip3/equip3_1_md.jpg','images/equip/equip3/equip3_1_lg.jpg');
insert into gym_pic values(10,3,'images/equip/equip3/equip3_2_sm.jpg','images/equip/equip3/equip3_2_md.jpg','images/equip/equip3/equip3_2_lg.jpg');
insert into gym_pic values(11,3,'images/equip/equip3/equip3_3_sm.jpg','images/equip/equip3/equip3_3_md.jpg','images/equip/equip3/equip3_3_lg.jpg');
insert into gym_pic values(12,3,'images/equip/equip3/equip3_4_sm.jpg','images/equip/equip3/equip3_4_md.jpg','images/equip/equip3/equip3_4_lg.jpg');

insert into gym_pic values(13,4,'images/equip/equip4/equip4_1_sm.jpg','images/equip/equip4/equip4_1_md.jpg','images/equip/equip4/equip4_1_lg.jpg');
insert into gym_pic values(14,4,'images/equip/equip4/equip4_2_sm.jpg','images/equip/equip4/equip4_2_md.jpg','images/equip/equip4/equip4_2_lg.jpg');
insert into gym_pic values(15,4,'images/equip/equip4/equip4_3_sm.jpg','images/equip/equip4/equip4_3_md.jpg','images/equip/equip4/equip4_3_lg.jpg');
insert into gym_pic values(16,4,'images/equip/equip4/equip4_4_sm.jpg','images/equip/equip4/equip4_4_md.jpg','images/equip/equip4/equip4_4_lg.jpg');

insert into gym_pic values(17,5,'images/equip/equip5/equip5_1_sm.jpg','images/equip/equip5/equip5_1_md.jpg','images/equip/equip5/equip5_1_lg.jpg');
insert into gym_pic values(18,5,'images/equip/equip5/equip5_2_sm.jpg','images/equip/equip5/equip5_2_md.jpg','images/equip/equip5/equip5_2_lg.jpg');
insert into gym_pic values(19,5,'images/equip/equip5/equip5_3_sm.jpg','images/equip/equip5/equip5_3_md.jpg','images/equip/equip5/equip5_3_lg.jpg');
insert into gym_pic values(20,5,'images/equip/equip5/equip5_4_sm.jpg','images/equip/equip5/equip5_4_md.jpg','images/equip/equip5/equip5_4_lg.jpg');

insert into gym_pic values(21,6,'images/equip/equip6/equip6_1_sm.jpg','images/equip/equip6/equip6_1_md.jpg','images/equip/equip6/equip6_1_lg.jpg');
insert into gym_pic values(22,6,'images/equip/equip6/equip6_2_sm.jpg','images/equip/equip6/equip6_2_md.jpg','images/equip/equip6/equip6_2_lg.jpg');
insert into gym_pic values(23,6,'images/equip/equip6/equip6_3_sm.jpg','images/equip/equip6/equip6_3_md.jpg','images/equip/equip6/equip6_3_lg.jpg');
insert into gym_pic values(24,6,'images/equip/equip6/equip6_4_sm.jpg','images/equip/equip6/equip6_4_md.jpg','images/equip/equip6/equip6_4_lg.jpg');

insert into gym_pic values(25,7,'images/equip/equip7/equip7_1_sm.jpg','images/equip/equip7/equip7_1_md.jpg','images/equip/equip7/equip7_1_lg.jpg');
insert into gym_pic values(26,7,'images/equip/equip7/equip7_2_sm.jpg','images/equip/equip7/equip7_2_md.jpg','images/equip/equip7/equip7_2_lg.jpg');
insert into gym_pic values(27,7,'images/equip/equip7/equip7_3_sm.jpg','images/equip/equip7/equip7_3_md.jpg','images/equip/equip7/equip7_3_lg.jpg');
insert into gym_pic values(28,7,'images/equip/equip7/equip7_4_sm.jpg','images/equip/equip7/equip7_4_md.jpg','images/equip/equip7/equip7_4_lg.jpg');

insert into gym_pic values(29,8,'images/equip/equip8/equip8_1_sm.jpg','images/equip/equip8/equip8_1_md.jpg','images/equip/equip8/equip8_1_lg.jpg');
insert into gym_pic values(30,8,'images/equip/equip8/equip8_2_sm.jpg','images/equip/equip8/equip8_2_md.jpg','images/equip/equip8/equip8_2_lg.jpg');
insert into gym_pic values(31,8,'images/equip/equip8/equip8_3_sm.jpg','images/equip/equip8/equip8_3_md.jpg','images/equip/equip8/equip8_3_lg.jpg');
insert into gym_pic values(32,8,'images/equip/equip8/equip8_4_sm.jpg','images/equip/equip8/equip8_4_md.jpg','images/equip/equip8/equip8_4_lg.jpg');

insert into gym_pic values(33,9,'images/equip/equip9/equip9_1_sm.jpg','images/equip/equip9/equip9_1_md.jpg','images/equip/equip9/equip9_1_lg.jpg');
insert into gym_pic values(34,9,'images/equip/equip9/equip9_2_sm.jpg','images/equip/equip9/equip9_2_md.jpg','images/equip/equip9/equip9_2_lg.jpg');
insert into gym_pic values(35,9,'images/equip/equip9/equip9_3_sm.jpg','images/equip/equip9/equip9_3_md.jpg','images/equip/equip9/equip9_3_lg.jpg');
insert into gym_pic values(36,9,'images/equip/equip9/equip9_4_sm.jpg','images/equip/equip9/equip9_4_md.jpg','images/equip/equip9/equip9_4_lg.jpg');


CREATE TABLE gym_shoppingcart (
  lid int(11) primary key auto_increment,
  id int(11) NOT NULL,
  pid int(11) NOT NULL,
  count int(8) NOT null,
  ischecked int(1) default 0
);
INSERT INTO gym_shoppingcart VALUES (null, 1, 1, 1, default);
INSERT INTO gym_shoppingcart VALUES (null, 1, 2, 2, default);
INSERT INTO gym_shoppingcart VALUES (null, 1, 3, 1, default);
INSERT INTO gym_shoppingcart VALUES (null, 1, 4, 1, default);
INSERT INTO gym_shoppingcart VALUES (null, 1, 5, 1, default);
INSERT INTO gym_shoppingcart VALUES (null, 1, 6, 1, default);
INSERT INTO gym_shoppingcart VALUES (null, 1, 7, 1, default);
INSERT INTO gym_shoppingcart VALUES (null, 1, 8, 2, default);
INSERT INTO gym_shoppingcart VALUES (null, 1, 9, 2, default);

INSERT INTO gym_shoppingcart VALUES (null, 2, 1, 5, default);
INSERT INTO gym_shoppingcart VALUES (null, 3, 1, 5, default);
INSERT INTO gym_shoppingcart VALUES (null, 4, 1, 7, default);
INSERT INTO gym_shoppingcart VALUES (null, 5, 1, 8, default);

-- 轮播图片的数据表
CREATE TABLE `gym_carousel` (
  `cid` int(11) primary key auto_increment,
  `img` varchar(128) default NULL
);
INSERT INTO `gym_carousel` VALUES ('1','images/banner/banner1.jpg');
INSERT INTO `gym_carousel` VALUES ('2','images/banner/banner2.jpg');
INSERT INTO `gym_carousel` VALUES ('3','images/banner/banner3.jpg');