import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Query } from '@syncfusion/ej2-data';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  ContextMenuItem,
  GroupSettingsModel,
  EditSettingsModel,
  ContextMenuItemModel,
  DialogEditEventArgs,
  SaveEventArgs,
} from '@syncfusion/ej2-grids';
import {
  BeforeOpenCloseMenuEventArgs,
  ContextMenuComponent,
  MenuEventArgs,
  MenuItemModel,
} from '@syncfusion/ej2-angular-navigations';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { Dialog } from '@syncfusion/ej2-popups';
import { createCheckBox } from '@syncfusion/ej2-angular-buttons';
import { closest, createElement, EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { sampleData } from './datasource';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'sync-function';
  public pager: Object | undefined;
  public editSettings: Object | undefined;
  public contextMenuItems: any;
  public emtyarray: any[] = [];
  @ViewChild('dialog')
  public alertDialog!: DialogComponent;
  @ViewChild('FormDialog')
  public Dialog!: DialogComponent;
  @ViewChild('grid') public grid: TreeGridComponent | undefined;
  @ViewChild('contextmenu')
  public contextmenu: ContextMenuComponent | undefined;
  @ViewChild('headercontextmenu')
  public headercontextmenu: ContextMenuComponent | undefined;
  @ViewChild('headercontextmenu')
  public toolbar: string[] | undefined;
  public selectitem: string[] | undefined;
  public filterOptions: Object = { type: 'Menu' };
  public columns: any;
  columnIndex: number = 0;
  columnName: string = '';
  public selectOptions!: Object;
  constructor(@Inject(FormBuilder) public formBuilder: FormBuilder) { }
  public form!: FormGroup;
  public width: string = '335px';
  public visible: boolean = false;
  public multiple: boolean = false;
  public showCloseIcon: Boolean = true;
  public target: string = '#reactDialog';
  public isModal: boolean = true;
  public rowIndex: number | undefined;
  public cellIndex: number | undefined;
  // cut paste data start
  public fieldData: any = [];
  public cutIndex: any;
  public flag: any = false;
  // cut paste data end
  private formSumitAttempt!: boolean;


  @ViewChild('ddlelement')
  public dropDownListObject = DropDownListComponent;
  @ViewChild('ddlelement2') public dropDownListObject2 = DropDownListComponent;
  // defined the array of data
  public dropdowndata: { [key: string]: Object }[] = [{ Id: 'string', Game: 'string' },
  { Id: 'number', Game: 'number' }, { Id: 'boolean', Game: 'boolean' }, { Id: 'date', Game: 'date' }];
  public fields: Object = { text: 'Game', value: 'Id' };

  public customaligmentdropdown: { [key: string]: Object }[] = [{ Id: 'Right', aligement: 'Right' },
  { Id: 'Left', aligement: 'Left' }];
  public aligementfields: Object = { text: 'aligement', value: 'Id' };
  public uploadInput: string = '';
  public Submit(): void {
    this.onFormSubmit();
  }


  public menuItems: MenuItemModel[] = [
    {
      text: 'Row Drag and drop enable',
      id: 'drag',
    },
    {
      text: 'Click to Enable MultiSelect',
      id: 'MultiSelect',
    },
    { text: 'Copy', id: 'customCopy' },
    { text: 'Paste', id: 'customPaste' },
    { text: 'cut', id: 'customcut' },
    {
      text: 'Edit',
      iconCss: 'e-icons e-edit',
    },

    {
      text: 'AddRow',
      id: 'addrow'
    },

    {
      text: 'Delete',
      id: 'delete'
    },
    {
      text: 'Save',
    },
    {
      text: 'Cancel',
    },


  ];
  public headermenuItems: MenuItemModel[] = [
    {
      text: 'Edit Column',
      id: 'EditCol',
    },
    {
      text: 'New Column',
      id: 'NewCol',
    },
    {
      text: 'Delete Column',
      id: 'DelCol',
    },
    {
      text: 'Choose Column',
      id: 'ChooseCol',
    },
    {
      text: 'Freeze Column',
      id: 'FreezeCol',
      // items: [
      //   {
      //     text: 'CustomerID',

      //   },
      //   {
      //     text: 'OrderID'
      //   },
      //   {
      //     text: 'Freight'
      //   },
      //   {
      //     text: 'OrderDate'
      //   }

      // ]
    },
    {
      text: 'Filter Columns',
      id: 'FilterCol',
    },
    {
      text: 'Multi Sort',
      id: 'MultiSort',
    },
  ];

  public editing!: object;
  public data: object[] = [];
  public pageSettings!: Object;
  public editparams!: Object;
  ngOnInit(): void {
    this.data = sampleData;
    this.columns = [
      {
        field: 'id',
        headerText: 'ID',
        isPrimaryKey: true,
        validationRules: '',
        edit: 'editparams',
        visible: false
      },
      {
        field: 'first_name',
        headerText: 'First Name',
        editType: 'stringedit',
        validationRules: '',
      },

      {
        field: 'last_name',
        headerText: 'Last Name',
        editType: 'stringedit',
        validationRules: '',
      },
      {
        field: 'email',
        headerText: 'Email Address',
        editType: 'stringedit',
        validationRules: '',
      },
      {
        field: 'gender',
        headerText: 'Gender',
        editType: 'stringedit',
        validationRules: '',
      },
      {
        field: 'ip_address',
        headerText: 'IP Address',
        editType: 'numericedit',
        validationRules: '',
      },

    ];
    this.contextMenuItems = [
      {
        text: 'Row Drag and drop enable',
        id: 'drag',
        target: '.e-content',
        iconCss: 'c-custom',
      },
      {
        text: 'Click to Enable MultiSelect',
        id: 'MultiSelect',
        target: '.e-content',
        iconCss: 'c-custom',
      },
      { text: 'Copy', id: 'customCopy', target: '.e-content', },
      { text: 'Paste', id: 'customPaste', target: '.e-content', },
      { text: 'cut', id: 'customcut', target: '.e-content', },


      'AddRow',
      'Edit',
      'Delete',
      'Save',
      'Cancel',
    ];
    this.form = this.formBuilder.group({
      fieldName: [null, Validators.required],
      headerText: [null],
      columnwidth: [null],
      columndataType: [null],
      fontsyle: [null],
      backgroundcolor: [null],
      textaligement: [null],
      fontcolor: [null],
      fontsize: [null]
    });
    this.editing = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog',
      newRowPosition: 'Below',
    };
    this.editparams = { params: { format: 'n' } };
  }

  contextMenuClick(args: MenuEventArgs): void {
    debugger;
    if (args.item.id === 'drag') {
      if (this.grid!.allowRowDragAndDrop) {
        this.grid!.allowRowDragAndDrop = false;
        this.grid!.refresh();
      } else {
        this.grid!.allowRowDragAndDrop = true;
        this.selectOptions = { type: 'Multiple' };
        this.grid!.toolbarModule.enableItems(['Add', 'Edit', 'Delete', 'Update', 'Cancel'], true);
        this.grid!.refresh();
        this.grid!.showColumnChooser = true;
        this.grid!.refreshColumns();

      }
    }
    // Rows Info
    if (args.item.id === 'MultiSelect') {
      if (this.selectOptions !== null && this.selectOptions !== undefined && this.selectOptions !== Object) {
        this.selectOptions = Object;
        this.grid!.refreshColumns();
        this.grid!.refresh();
      } else {
        this.selectOptions = {
          type: 'Multiple',
          mode: 'Cell',
          cellSelectionMode: 'Box',
        };
        (this.editing = {
          allowEditing: true,
          allowAdding: true,
          allowDeleting: true,
          mode: 'Batch',
          newRowPosition: 'Top'
        }),
          this.grid!.refresh();
      }
    }
    if (args.item.id === 'customCopy') {
      (this.editing = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: 'Batch',
      }),
        this.grid!.copy();
    } else if (args.item.id === 'customPaste') {
      var rowIndex = this.rowIndex;
      var cellIndex = this.cellIndex;
      var copyContent = (this.grid!.clipboardModule as any).copyContent;
      if (this.flag) {
        for (var i = 0; i < this.cutIndex.length; i++) {
          var rowInfo = this.grid!.getRowInfo(this.grid!.getRowByIndex(this.cutIndex[i].rowIndex)) as any
          for (var j = 0; j < this.fieldData.length; j++) {
            if (rowInfo.rowData[this.fieldData[j]] != '') {
              this.grid!.updateCell(this.cutIndex[i].rowIndex, this.fieldData[j], '');
            }
          }
        }


        this.grid!.paste(copyContent, rowIndex!, cellIndex!);
      }
      else {
        this.grid!.paste(copyContent, rowIndex!, cellIndex!);
      }

    }
    if (args.item.id === 'customcut') {
      this.flag = true;
      for (var i = 0; i < this.grid!.getSelectedRowCellIndexes()[0].cellIndexes.length; i++) {
        this.fieldData.push(this.grid!.grid.getColumnByIndex(this.grid!.getSelectedRowCellIndexes()[0].cellIndexes[i]).field);
      }
      this.cutIndex = this.grid!.getSelectedRowCellIndexes();
      this.grid!.copy();
    }
  }

  EditColumn(columnName: any) {
    debugger;
    let singlecolumn = this.columns.find(
      (x: { field: any }) => x.field == columnName
    );

    this.emtyarray != JSON.parse(localStorage.getItem('gridCol')!);
    if(this.emtyarray.length>0){
      if(this.emtyarray.find(x => x.field == singlecolumn.field)){
      this.form.controls['backgroundcolor'].setValue(this.emtyarray.find(x => x.field == singlecolumn.field).celltype);
        
      }
    }
  
    this.Dialog.show();
    this.form.controls['fieldName'].setValue(singlecolumn.field);
    this.form.controls['headerText'].setValue(singlecolumn.headerText);
    this.form.controls['columnwidth'].setValue(singlecolumn.width);
    this.form.controls['columndataType'].setValue(singlecolumn.type);
    this.form.controls['textaligement'].setValue(singlecolumn.textAlign);

    //this.form.controls['fontsyle'].setValue(singlecolumn.customAttributes);

  }
  deleteColumn(columnName: any) {
    let singlecolumn = this.columns.find(
      (x: { field: any }) => x.field == columnName
    );
    this.grid!.columns.splice(singlecolumn.index, 1);
    this.grid!.refreshColumns();
  }
  beforeOpen(args: any): void {
    if (this.grid!.getColumnByField('CustomerID').visible == true) {
      // document.getElementById("unhide").style.display = "none";
      // document.getElementById("hide").style.display = "";
      //document.getElementById("unhide").disabled = true
      //this.contextmenu.hideItems(['UnHide Column']);
    } else {
      // document.getElementById("hide").style.display = "none";
      // document.getElementById("unhide").style.display = "";
    }
  }
  select(args: MenuEventArgs): void {
    debugger;
    // this.grid!.getColumnByField(this.columnName).textAlign = 'Left';
    // this.grid!.refreshColumns();

    if (args.item.id === 'FreezeCol') {
      if (this.grid!.frozenColumns > 0) {
        this.grid!.frozenColumns = 0;
        this.grid!.refreshColumns();
      } else {
        let columnsLenght = Math.round(this.grid!.getColumns().length / 2);
        this.grid!.frozenColumns = columnsLenght;
      }
    }
    if (args.item.id === 'FilterCol') {
      if (this.grid!.allowFiltering) {
        this.grid!.allowFiltering = false;
        this.grid!.refreshColumns();
      } else {
        this.grid!.allowFiltering = true;
        this.grid!.refreshColumns();
      }
    }

    if (args.item.id === 'MultiSort') {
      if (this.grid!.allowSorting) {
        this.grid!.allowSorting = false;
        this.grid!.refreshColumns();
      } else {
        this.grid!.allowSorting = true;
        this.grid!.refreshColumns();
      }
    }
    if (args.item.id === 'ChooseCol') {
      this.grid!.showColumnChooser = true;
      this.grid!.refreshColumns();
      this.toolbar = ['ColumnChooser'];
    }
    if (args.item.id === 'NewCol') {
      this.Dialog.show();
      this.columnName = '';
      this.form.reset();
      this.headercontextmenu?.close();
    }

    if (args.item.id === 'EditCol') {
      this.EditColumn(this.columnName);
      this.headercontextmenu?.close();
    }
    if (args.item.id === 'DelCol') {
      this.deleteColumn(this.columnName);
      this.headercontextmenu?.close();
    }

    if (args.item.text === 'Edit') {
      debugger;
      if (this.grid!.getSelectedRecords().length) {
        this.grid!.startEdit();

      } else {
        alert('Select any row');
      }
      this.contextmenu?.close();
    }

    if (args.item.id === 'drag') {
      if (this.grid!.allowRowDragAndDrop) {
        this.grid!.allowRowDragAndDrop = false;
        this.grid!.refresh();
      } else {
        this.grid!.allowRowDragAndDrop = true;
        this.selectOptions = { type: 'Multiple' };

        this.grid!.showColumnChooser = true;
        this.grid!.refreshColumns();
        this.toolbar = ['ColumnChooser'];
        this.grid!.refresh();
      }
      this.contextmenu?.close();
    }
    // Rows Info
    if (args.item.id === 'MultiSelect') {
      if (this.selectOptions !== null && this.selectOptions !== undefined && this.selectOptions !== Object) {
        this.selectOptions = Object;
        this.grid!.refreshColumns();
        this.grid!.refresh();
      } else {
        this.selectOptions = {
          type: 'Multiple',
          mode: 'Cell',
          cellSelectionMode: 'Box',
        };
        (this.editing = {
          allowEditing: true,
          allowAdding: true,
          allowDeleting: true,
          mode: 'Batch',
          newRowPosition: 'Top'
        }),
          this.grid!.refresh();
        this.contextmenu?.close();
      }
    }
    if (args.item.id === 'customCopy') {
      (this.editing = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: 'Batch',
      }),
        this.grid!.copy();
    } else if (args.item.id === 'customPaste') {
      var rowIndex = this.rowIndex;
      var cellIndex = this.cellIndex;
      var copyContent = (this.grid!.clipboardModule as any).copyContent;
      if (this.flag) {
        for (var i = 0; i < this.cutIndex.length; i++) {
          var rowInfo = this.grid!.getRowInfo(this.grid!.getRowByIndex(this.cutIndex[i].rowIndex)) as any
          for (var j = 0; j < this.fieldData.length; j++) {
            if (rowInfo.rowData[this.fieldData[j]] != '') {
              this.grid!.updateCell(this.cutIndex[i].rowIndex, this.fieldData[j], '');
            }
          }
        }


        this.grid!.paste(copyContent, rowIndex!, cellIndex!);
      }
      else {
        this.grid!.paste(copyContent, rowIndex!, cellIndex!);
      }

    }
    if (args.item.id === 'customcut') {
      this.flag = true;
      for (var i = 0; i < this.grid!.getSelectedRowCellIndexes()[0].cellIndexes.length; i++) {
        this.fieldData.push(this.grid!.grid.getColumnByIndex(this.grid!.getSelectedRowCellIndexes()[0].cellIndexes[i]).field);
      }
      this.cutIndex = this.grid!.getSelectedRowCellIndexes();
      this.grid!.copy();
    }

    if (args.item.id === 'delete') {

      if (this.grid!.getSelectedRecords().length) {
        this.grid!.deleteRecord();
      } else {
        alert('Select any row');
      }
      this.contextmenu?.close();
    }
    if (args.item.id === 'addrow') {

      if (this.grid!.getSelectedRecords().length) {
        this.grid!.addRecord();
      } else {
        alert('Select any row');
      }
      this.contextmenu?.close();
    }
    // if (args.item.id === 'drag') {
    //   if (this.grid!.allowRowDragAndDrop) {
    //     this.grid!.allowRowDragAndDrop = false;
    //     this.grid!.refreshColumns();
    //   } else {
    //     this.grid!.allowRowDragAndDrop = true;
    //     this.grid!.refreshColumns();
    //   }
    // }
    // // Rows Info
    // if (args.item.id === 'MultiSelect') {
    //   if (this.selectOptions !== null && this.selectOptions !== undefined) {
    //     this.selectOptions = {};
    //     this.grid!.refreshColumns();
    //   } else {
    //     this.selectOptions = {
    //       type: 'Multiple',
    //       mode: 'Cell',
    //       cellSelectionMode: 'Box',
    //     };
    //     this.grid!.refreshColumns();
    //   }
    // }

    if (args.item.id === 'EditRow') {
      if (this.editing !== null && this.editing !== undefined) {
        this.editing = {};
        this.grid!.refreshColumns();
      } else {
        this.editing = {
          allowEditing: true,
          allowAdding: true,
          allowDeleting: true,
          mode: 'Dialog',
          newRowPosition: 'Below',
        };

        this.grid!.refreshColumns();
      }
    }

    // console.log(this.grid!.getColumnByField('CustomerID'));
    // this.grid!.getColumnByField('CustomerID').freeze = 'Left' ;
    // this.data = this.data;
    // this.grid.editModule.batchSave();
  }
  isInitialLoad = true;
  contextMenuOpen(arg: any) {
    debugger;
    if (this.isInitialLoad) {
      this.isInitialLoad = false;
      let parentNode: any[] = [];
      var customEle = arg.element.querySelectorAll('.c-custom');
      if (customEle.length) {
        customEle.forEach((innerEle: any) => {
          parentNode.push(innerEle.parentElement);
        });
        console.log(parentNode);
        parentNode.forEach((ele: any) => {
          var text = ele.textContent;
          ele.innerText = '';
          let inputEle = createElement('input') as any;
          inputEle.type = 'checkbox';

          inputEle.setAttribute('class', 'e-checkbox');
          ele.prepend(inputEle);
          let spanEle = createElement('span');
          spanEle.textContent = text;
          spanEle.setAttribute('class', 'e-checkboxspan');
          ele.appendChild(spanEle);
        });
      }
    }
    if (arg.event.target.closest('.e-headercell') != null) {
      this.columnIndex = parseInt(
        arg.event.target.closest('.e-headercell').ariaColIndex
      );
      this.columnName = this.grid!.getColumns(true)[this.columnIndex].field;
    }

    this.rowIndex = this.grid?.getRowInfo(arg.event.target).rowIndex;
    this.cellIndex = this.grid?.getRowInfo(arg.event.target).cellIndex;
  }

  public itemRender(args: MenuEventArgs) {
    if (
      args.element.id == 'MultiSort' ||
      args.element.id == 'FilterCol' ||
      args.element.id == 'FreezeCol'
    ) {
      let check: Element = createCheckBox(createElement, false, {
        label: args.item.text,
        checked: args.item.text == 'Option 2' ? true : false,
      });
      args.element.innerHTML = '';
      args.element.appendChild(check);
    }
  }
  public itemRenderRows(args: any) {
    debugger;

    if (args.element.id == 'drag' || args.element.id == 'MultiSelect') {
      let check: Element = createCheckBox(createElement, false, {
        label: args.item.text,
        checked: args.item.text == 'Option 2' ? true : false,
      });
      args.element.innerHTML = '';
      args.element.appendChild(check);
    }
  }

  // customize header-cell styles 
  headerCellInfo(args: any) {
    if (args.cell.column.field == 'CustomerName') {
      args.node.classList.add('e-cus')
    }
  }


  // customize cell styles 
  queryCellInfo(args: any) {
    this.emtyarray != JSON.parse(localStorage.getItem('gridCol')!);
    if (this.emtyarray.find(x => x.field == args.column.field)) {
      let color = this.emtyarray.find(x => x.field == args.column.field);
      args.cell.style.backgroundColor = color.celltype;

      // args.cell.classList.add('font-size',this.form.value['fontsize']);
    }
  }
  public beforeClose(args: BeforeOpenCloseMenuEventArgs) {
    if ((args.event.target as Element).closest('.e-menu-item')) {
      args.cancel = true;
      let selectedElem: NodeList = args.element.querySelectorAll('.e-selected');
      for (let i: number = 0; i < selectedElem.length; i++) {
        let ele: Element = selectedElem[i] as Element;
        ele.classList.remove('e-selected');
      }
      let checkbox: HTMLElement = closest(
        args.event.target as Element,
        '.e-checkbox-wrapper'
      ) as HTMLElement;
      let frame: HTMLElement = checkbox.querySelector(
        '.e-frame'
      ) as HTMLElement;
      if (checkbox && frame.classList.contains('e-check')) {
        frame.classList.remove('e-check');
        this.headercontextmenu?.close();
      } else if (checkbox) {
        frame.classList.add('e-check');
        this.headercontextmenu?.close();
      }
    }
  }

  public beforeCloserows(args: BeforeOpenCloseMenuEventArgs) {
    if ((args.event.target as Element).closest('.e-menu-item')) {
      args.cancel = true;
      let selectedElem: NodeList = args.element.querySelectorAll('.e-selected');
      for (let i: number = 0; i < selectedElem.length; i++) {
        let ele: Element = selectedElem[i] as Element;
        ele.classList.remove('e-selected');
      }
      let checkbox: HTMLElement = closest(
        args.event.target as Element,
        '.e-checkbox-wrapper'
      ) as HTMLElement;
      let frame: HTMLElement = checkbox.querySelector(
        '.e-frame'
      ) as HTMLElement;
      if (checkbox && frame.classList.contains('e-check')) {
        frame.classList.remove('e-check');
        this.contextmenu?.close();
      } else if (checkbox) {
        frame.classList.add('e-check');
        this.contextmenu?.close();
      }
    }
  }

  public onFormSubmit(): void {
    debugger;
    this.formSumitAttempt = true;
    if (this.form.valid) {
      if (this.columnName !== null && this.columnName !== '') {
        let singlecolumn = this.grid!.getColumnByField(this.columnName);

        //singlecolumn.field = this.form.value['fieldName'];
        singlecolumn.headerText = this.form.value['headerText'];
        singlecolumn.width = this.form.value['columnwidth'];
        singlecolumn.type = this.form.value['columndataType'];
        singlecolumn.textAlign = this.form.value['textaligement'];
        //singlecolumn.customAttributes =  this.form.value['fontsyle'];

        let p = {
          field: this.form.value['fieldName'],
          headerText: this.form.value['headerText'],
          width: this.form.value['columnwidth'],
          type: this.form.value['columndataType'],
          celltype: this.form.value['backgroundcolor'],
          textAlign: this.form.value['textaligement']
          // customAttributes: { class: this.form.value['fontsyle'] }

        };

        if (localStorage.getItem("gridCol") === null || localStorage.getItem("gridCol") === undefined) {

          this.emtyarray!.push(p);
          localStorage.setItem("gridCol", JSON.stringify(this.emtyarray!));

        }
        else {

          this.emtyarray != JSON.parse(localStorage.getItem('gridCol')!);
          this.emtyarray!.push(p);
          localStorage.setItem("gridCol", JSON.stringify(this.emtyarray!));

        }
        this.grid!.refreshColumns();
        this.form.reset();
        this.Dialog.hide();
      } else {
        let p = {
          field: this.form.value['fieldName'],
          headerText: this.form.value['headerText'],
          width: this.form.value['columnwidth'],
          type: this.form.value['columndataType'],
          celltype: this.form.value['backgroundcolor']
          // customAttributes: { class: this.form.value['fontsyle'] }

        };

        if (localStorage.getItem("gridCol") === null || localStorage.getItem("gridCol") === undefined) {

          this.emtyarray!.push(p);
          localStorage.setItem("gridCol", JSON.stringify(this.emtyarray!));

        }
        else {

          this.emtyarray != JSON.parse(localStorage.getItem('gridCol')!);
          this.emtyarray!.push(p);
          localStorage.setItem("gridCol", JSON.stringify(this.emtyarray!));

        }
        this.columns.push(p);

        // this.form.reset();
        this.Dialog.hide();
      }
    } else {
      this.validateAllFormFields(this.form);
    }
    this.grid!.refreshColumns();
  }

  isFieldValid(field: string) {
    return true;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}

export interface IOrderModel {
  OrderID?: number;
  CustomerName?: string;
  ShipCity?: string;
  OrderDate?: Date;
  Freight?: number;
  ShipCountry?: string;
  ShipAddress?: string;
}
