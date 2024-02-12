import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private isView: boolean = false;
  private timer: number = 0;

  get state(): boolean {
    return this.isView;
  }

  /**
     * Отображает спиннер
     */
  public show(): void {
    this.isView = true;


    // Если таймаут для спиннера уже запущен - очищаем
    if (this.timer)
      this.clearTimer();

    const spinnerAutoHide = 1200000;

    // Автоматически скрываем спиннер через 60 секунд
    this.timer = window.setTimeout(() => {
      if (this.timer)
        this.hide();
    }, spinnerAutoHide);
  }

  /**
     * Скрывает спиннер
     */
  public hide(): void {
    this.isView = false;

    this.clearTimer();
  }

  /**
     * Очищает таймер автоматического скрытия спиннера
     */
  private clearTimer(): void {
    window.clearTimeout(this.timer);
    this.timer = 0;
  }
}
