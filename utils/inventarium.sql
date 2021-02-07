-- update item after update request to stat 3

DELIMITER
    ##
CREATE TRIGGER requestItemUpdate AFTER UPDATE
ON
    request FOR EACH ROW
BEGIN
        IF(NEW.rqst_status = 3) THEN
    UPDATE
        item
    SET
        item.item_status = 1
    WHERE
        item.item_id = OLD.rqst_item_id ;
    END IF ;
END ##

-- update item on request insert

DELIMITER
    ##
CREATE TRIGGER requestItemInsert AFTER INSERT
ON
    request FOR EACH ROW
BEGIN
    UPDATE
        item
    SET
        item.item_status = 0
    WHERE
        item.item_id = NEW.rqst_item_id ;
END ##